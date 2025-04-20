
import { Reminder, Task } from "../types/task";
import { getFormattedReminderTime } from "../utils/taskUtils";
import { LocalNotifications } from '@capacitor/local-notifications';

/**
 * Checks if notifications are supported
 */
export const areNotificationsSupported = async (): Promise<boolean> => {
  try {
    // Try to use Capacitor for native mobile notifications
    const { value } = await LocalNotifications.checkPermissions();
    return value === 'granted';
  } catch (error) {
    // Fallback to web notifications
    return 'Notification' in window;
  }
};

/**
 * Requests notification permission
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    // Try Capacitor first for mobile
    const { value } = await LocalNotifications.requestPermissions();
    return value === 'granted';
  } catch (error) {
    // Fallback to web notifications
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }
};

/**
 * Shows a notification for a task reminder
 */
export const showTaskNotification = async (task: Task, reminder: Reminder): Promise<void> => {
  try {
    const time = getFormattedReminderTime(reminder.scheduledTime);
    const title = "حان وقت المهمة!";
    const body = `عليك مراجعة: ${task.title} اليوم في الساعة ${time}`;
    
    // Try to use Capacitor for native notifications
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: parseInt(reminder.id.replace(/-/g, '').substring(0, 8), 16) % 100000,
            extra: {
              taskId: task.id,
              reminderId: reminder.id
            }
          }
        ]
      });
    } catch (error) {
      // Fallback to web notifications
      if (areNotificationsSupported() && Notification.permission === 'granted') {
        const notification = new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: reminder.id,
          requireInteraction: true,
        });
        
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      }
    }
  } catch (error) {
    console.error("Error showing notification:", error);
  }
};

/**
 * Schedules all reminders for a task
 */
export const scheduleTaskReminders = (task: Task): void => {
  // Clear any existing reminders for this task
  clearTaskReminders(task.id);
  
  const now = new Date();
  
  // Schedule new reminders
  task.reminders.forEach(reminder => {
    if (
      !reminder.isCompleted && 
      !task.completedReminders.includes(reminder.id) && 
      reminder.scheduledTime > now
    ) {
      const timeUntilReminder = reminder.scheduledTime.getTime() - now.getTime();
      
      // Only schedule if it's in the future
      if (timeUntilReminder > 0) {
        const timerId = setTimeout(() => {
          showTaskNotification(task, reminder);
        }, timeUntilReminder);
        
        // Store the timer ID so we can cancel it later if needed
        storeReminderId(reminder.id, timerId);
      }
    }
  });
};

// Store timer IDs so we can cancel them
const reminderTimers: Record<string, NodeJS.Timeout> = {};

/**
 * Stores a reminder timer ID
 */
const storeReminderId = (reminderId: string, timerId: NodeJS.Timeout): void => {
  reminderTimers[reminderId] = timerId;
};

/**
 * Clears all reminders for a task
 */
export const clearTaskReminders = (taskId: string): void => {
  Object.entries(reminderTimers).forEach(([reminderId, timerId]) => {
    if (reminderId.startsWith(taskId)) {
      clearTimeout(timerId);
      delete reminderTimers[reminderId];
    }
  });
};

/**
 * Initializes the notification system and schedules all reminders
 */
export const initializeNotifications = async (tasks: Task[]): Promise<void> => {
  const hasPermission = await requestNotificationPermission();
  
  if (hasPermission) {
    tasks.forEach(task => {
      scheduleTaskReminders(task);
    });
    
    // Setup Capacitor local notification click handler
    try {
      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        const taskId = notification.notification.extra?.taskId;
        const reminderId = notification.notification.extra?.reminderId;
        
        if (taskId && reminderId) {
          // You would implement some navigation here
          console.log(`Notification clicked for task ${taskId} and reminder ${reminderId}`);
        }
      });
    } catch (error) {
      console.error("Error setting up notification listener:", error);
    }
  }
};
