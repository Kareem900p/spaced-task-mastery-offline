
import { Task, Reminder, ReminderType, REMINDER_DAYS } from "../types/task";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates a new task with the given parameters
 */
export const createTask = (
  title: string,
  mainTime: Date,
  expectedDuration: number
): Task => {
  const taskId = uuidv4();
  const reminders = generateReminders(taskId, mainTime);
  
  return {
    id: taskId,
    title,
    mainTime,
    expectedDuration,
    createdAt: new Date(),
    reminders,
    completedReminders: []
  };
};

/**
 * Generates all reminders for a task based on the main time
 */
export const generateReminders = (taskId: string, mainTime: Date): Reminder[] => {
  const reminders: Reminder[] = [];
  
  // Spaced repetition reminders
  REMINDER_DAYS.forEach(days => {
    const reminderDate = new Date(mainTime);
    reminderDate.setDate(reminderDate.getDate() + days);
    
    let reminderType: ReminderType;
    switch (days) {
      case 1: reminderType = ReminderType.DAY_1; break;
      case 2: reminderType = ReminderType.DAY_2; break;
      case 3: reminderType = ReminderType.DAY_3; break;
      case 5: reminderType = ReminderType.DAY_5; break;
      case 7: reminderType = ReminderType.DAY_7; break;
      case 10: reminderType = ReminderType.DAY_10; break;
      case 15: reminderType = ReminderType.DAY_15; break;
      case 20: reminderType = ReminderType.DAY_20; break;
      case 25: reminderType = ReminderType.DAY_25; break;
      case 30: reminderType = ReminderType.DAY_30; break;
      default: reminderType = ReminderType.DAY_1;
    }
    
    reminders.push({
      id: uuidv4(),
      taskId,
      scheduledTime: reminderDate,
      type: reminderType,
      isCompleted: false
    });
  });
  
  return reminders;
};

/**
 * Gets the formatted reminder time for display
 */
export const getFormattedReminderTime = (time: Date): string => {
  return time.toLocaleTimeString('ar-SA', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

/**
 * Gets the formatted reminder date for display
 */
export const getFormattedReminderDate = (date: Date): string => {
  return date.toLocaleDateString('ar-SA', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Gets the upcoming reminders for a task
 */
export const getUpcomingReminders = (task: Task): Reminder[] => {
  const now = new Date();
  return task.reminders
    .filter(reminder => 
      !reminder.isCompleted && 
      !task.completedReminders.includes(reminder.id) &&
      reminder.scheduledTime > now
    )
    .sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime());
};

/**
 * Gets the reminder type display text in Arabic
 */
export const getReminderTypeText = (type: ReminderType): string => {
  switch (type) {
    case ReminderType.DAY_1: return "اليوم الأول";
    case ReminderType.DAY_2: return "اليوم الثاني";
    case ReminderType.DAY_3: return "اليوم الثالث";
    case ReminderType.DAY_5: return "اليوم الخامس";
    case ReminderType.DAY_7: return "اليوم السابع";
    case ReminderType.DAY_10: return "اليوم العاشر";
    case ReminderType.DAY_15: return "اليوم الخامس عشر";
    case ReminderType.DAY_20: return "اليوم العشرون";
    case ReminderType.DAY_25: return "اليوم الخامس والعشرون";
    case ReminderType.DAY_30: return "اليوم الثلاثون";
    default: return "";
  }
};
