
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
  
  // Pre-task reminders (30 minutes before)
  const reminder30Min = new Date(mainTime.getTime() - 30 * 60 * 1000);
  reminders.push({
    id: uuidv4(),
    taskId,
    scheduledTime: reminder30Min,
    type: ReminderType.PRE_TASK_30_MIN,
    isCompleted: false
  });
  
  // Pre-task reminders (15 minutes before)
  const reminder15Min = new Date(mainTime.getTime() - 15 * 60 * 1000);
  reminders.push({
    id: uuidv4(),
    taskId,
    scheduledTime: reminder15Min,
    type: ReminderType.PRE_TASK_15_MIN,
    isCompleted: false
  });
  
  // Main time reminder
  reminders.push({
    id: uuidv4(),
    taskId,
    scheduledTime: new Date(mainTime),
    type: ReminderType.MAIN,
    isCompleted: false
  });
  
  // Spaced repetition reminders (after 1, 2, 3, 5, 7, 14, 30 days)
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
      case 14: reminderType = ReminderType.DAY_14; break;
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
    case ReminderType.PRE_TASK_30_MIN: return "قبل 30 دقيقة";
    case ReminderType.PRE_TASK_15_MIN: return "قبل 15 دقيقة";
    case ReminderType.MAIN: return "الموعد الرئيسي";
    case ReminderType.DAY_1: return "بعد يوم";
    case ReminderType.DAY_2: return "بعد يومين";
    case ReminderType.DAY_3: return "بعد 3 أيام";
    case ReminderType.DAY_5: return "بعد 5 أيام";
    case ReminderType.DAY_7: return "بعد أسبوع";
    case ReminderType.DAY_14: return "بعد أسبوعين";
    case ReminderType.DAY_30: return "بعد شهر";
    default: return "";
  }
};
