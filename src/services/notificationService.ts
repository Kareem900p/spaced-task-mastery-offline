import { LocalNotifications, ScheduleOptions, PermissionStatus } from '@capacitor/local-notifications';
import { isOnline } from '@/utils/networkUtils';

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
    await LocalNotifications.cancelAll();
    console.log('All notifications cancelled');
  } catch (error) {
    console.error('Error cancelling all notifications:', error);
  }
};
