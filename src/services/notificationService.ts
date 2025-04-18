
import { Reminder, Task } from "../types/task";
import { getFormattedReminderTime } from "../utils/taskUtils";

/**
 * Checks if notifications are supported and permitted
 */
export const areNotificationsSupported = (): boolean => {
  return 'Notification' in window;
};

/**
 * Requests notification permission
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!areNotificationsSupported()) {
    return false;
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
};

/**
 * Shows a notification for a task reminder
 */
export const showTaskNotification = (task: Task, reminder: Reminder): void => {
  if (!areNotificationsSupported() || Notification.permission !== 'granted') {
    return;
  }
  
  try {
    const time = getFormattedReminderTime(reminder.scheduledTime);
    const title = "حان وقت المهمة!";
    const body = `عليك مراجعة: ${task.title} اليوم في الساعة ${time}`;
    
    const notification = new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: reminder.id, // Ensures we don't show duplicate notifications
      requireInteraction: true, // Notification remains until user interacts with it
    });
    
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    
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
  }
};
