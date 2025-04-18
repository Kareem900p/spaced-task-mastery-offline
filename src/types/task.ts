
export interface Task {
  id: string;
  title: string;
  mainTime: Date;
  expectedDuration: number; // in hours
  createdAt: Date;
  reminders: Reminder[];
  completedReminders: string[]; // Array of reminder IDs that are completed
}

export interface Reminder {
  id: string;
  taskId: string;
  scheduledTime: Date;
  type: ReminderType;
  isCompleted: boolean;
}

export enum ReminderType {
  PRE_TASK_30_MIN = "PRE_TASK_30_MIN",
  PRE_TASK_15_MIN = "PRE_TASK_15_MIN",
  MAIN = "MAIN",
  DAY_1 = "DAY_1",
  DAY_2 = "DAY_2", 
  DAY_3 = "DAY_3",
  DAY_5 = "DAY_5",
  DAY_7 = "DAY_7",
  DAY_14 = "DAY_14",
  DAY_30 = "DAY_30"
}

export const REMINDER_DAYS = [1, 2, 3, 5, 7, 14, 30];
