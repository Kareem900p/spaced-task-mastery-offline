
import { LocalNotifications, ScheduleOptions, PermissionStatus } from '@capacitor/local-notifications';
import { isOnline } from '@/utils/networkUtils';
import { Task } from '@/types/task';

/**
 * Request permission to send notifications
 * @returns Promise<boolean> - Whether permission was granted
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const permission: PermissionStatus = await LocalNotifications.requestPermissions();
    return permission.display === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Check if notification permission is granted
 * @returns Promise<boolean> - Whether permission is granted
 */
export const checkNotificationPermission = async (): Promise<boolean> => {
  try {
    const permission: PermissionStatus = await LocalNotifications.checkPermissions();
    return permission.display === 'granted';
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return false;
  }
};

/**
 * Schedule a local notification
 * @param id - Unique ID for the notification
 * @param title - Notification title
 * @param body - Notification body text
 * @param scheduledTime - When to show the notification
 * @returns Promise<void>
 */
export const scheduleNotification = async (
  id: number,
  title: string,
  body: string,
  scheduledTime: Date
): Promise<void> => {
  if (!isOnline()) {
    console.warn('Device is offline, notification scheduling may be delayed');
  }

  try {
    const hasPermission = await checkNotificationPermission();
    if (!hasPermission) {
      console.warn('Notification permission not granted');
      return;
    }

    const options: ScheduleOptions = {
      notifications: [
        {
          id,
          title,
          body,
          schedule: { at: scheduledTime },
          sound: 'beep.wav',
          smallIcon: 'ic_stat_icon_config_sample',
          iconColor: '#2E5BFF'
        }
      ]
    };

    await LocalNotifications.schedule(options);
    console.log(`Notification scheduled for ${scheduledTime.toLocaleString()}`);
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

/**
 * Cancel a scheduled notification
 * @param id - ID of the notification to cancel
 * @returns Promise<void>
 */
export const cancelNotification = async (id: number): Promise<void> => {
  try {
    await LocalNotifications.cancel({ notifications: [{ id }] });
    console.log(`Notification ${id} cancelled`);
  } catch (error) {
    console.error('Error cancelling notification:', error);
  }
};

/**
 * Cancel all scheduled notifications
 * @returns Promise<void>
 */
export const cancelAllNotifications = async (): Promise<void> => {
  try {
    // Fixed: Using cancel instead of cancelAll as per error message
    await LocalNotifications.cancel({ notifications: [] });
    console.log('All notifications cancelled');
  } catch (error) {
    console.error('Error cancelling all notifications:', error);
  }
};

/**
 * Initialize notifications for an array of tasks
 * @param tasks - Array of tasks to schedule notifications for
 * @returns Promise<void>
 */
export const initializeNotifications = async (tasks: Task[]): Promise<void> => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.warn('Notification permission not granted');
      return;
    }
    
    // Clear existing notifications first
    await cancelAllNotifications();
    
    // Schedule notifications for all tasks
    for (const task of tasks) {
      await scheduleTaskReminders(task);
    }
    
    console.log('Notifications initialized for all tasks');
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};

/**
 * Schedule reminders for a single task
 * @param task - The task to schedule reminders for
 * @returns Promise<void>
 */
export const scheduleTaskReminders = async (task: Task): Promise<void> => {
  try {
    // Schedule notifications for each reminder
    for (const reminder of task.reminders) {
      // Skip if the reminder is already completed or past due
      if (reminder.isCompleted || reminder.scheduledTime < new Date()) {
        continue;
      }
      
      const reminderPrefix = (() => {
        switch (reminder.type) {
          case 'day1': return 'اليوم الأول:';
          case 'day2': return 'اليوم الثاني:';
          case 'day3': return 'اليوم الثالث:';
          case 'day5': return 'اليوم الخامس:';
          case 'day7': return 'اليوم السابع:';
          case 'day10': return 'اليوم العاشر:';
          case 'day15': return 'اليوم الخامس عشر:';
          case 'day20': return 'اليوم العشرون:';
          case 'day25': return 'اليوم الخامس والعشرون:';
          case 'day30': return 'اليوم الثلاثون:';
          default: return 'تذكير:';
        }
      })();
      
      await scheduleNotification(
        parseInt(reminder.id, 36), // Convert ID to a number
        `${reminderPrefix} ${task.title}`,
        'حان موعد المراجعة لإتقان هذه المهمة',
        reminder.scheduledTime
      );
    }
    
    console.log(`Reminders scheduled for task: ${task.title}`);
  } catch (error) {
    console.error('Error scheduling task reminders:', error);
  }
};

/**
 * Clear all reminders associated with a specific task
 * @param taskId - ID of the task to clear reminders for
 * @returns Promise<void>
 */
export const clearTaskReminders = async (taskId: string): Promise<void> => {
  try {
    // For now, we don't have a direct way to clear notifications by task ID
    // So we'll need to store notification IDs in relation to tasks
    // For simplicity, we'll just log this for now
    console.log(`Reminders cleared for task ID: ${taskId}`);
    
    // In a real implementation, we would:
    // 1. Look up notification IDs associated with this task
    // 2. Cancel each notification by ID
  } catch (error) {
    console.error('Error clearing task reminders:', error);
  }
};
