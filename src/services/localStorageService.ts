
import { Task } from "../types/task";

const TASKS_STORAGE_KEY = "spaced_tasks";

/**
 * Saves all tasks to local storage
 */
export const saveTasks = (tasks: Task[]): void => {
  try {
    const serializedTasks = JSON.stringify(tasks.map(task => ({
      ...task,
      mainTime: task.mainTime.toISOString(),
      createdAt: task.createdAt.toISOString(),
      reminders: task.reminders.map(reminder => ({
        ...reminder,
        scheduledTime: reminder.scheduledTime.toISOString()
      }))
    })));
    localStorage.setItem(TASKS_STORAGE_KEY, serializedTasks);
  } catch (error) {
    console.error("Error saving tasks to local storage:", error);
  }
};

/**
 * Loads all tasks from local storage
 */
export const loadTasks = (): Task[] => {
  try {
    const serializedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!serializedTasks) return [];
    
    const parsedTasks = JSON.parse(serializedTasks);
    return parsedTasks.map((task: any) => ({
      ...task,
      mainTime: new Date(task.mainTime),
      createdAt: new Date(task.createdAt),
      reminders: task.reminders.map((reminder: any) => ({
        ...reminder,
        scheduledTime: new Date(reminder.scheduledTime)
      }))
    }));
  } catch (error) {
    console.error("Error loading tasks from local storage:", error);
    return [];
  }
};

/**
 * Saves a single task to local storage
 */
export const saveTask = (task: Task): void => {
  const tasks = loadTasks();
  const existingIndex = tasks.findIndex(t => t.id === task.id);
  
  if (existingIndex >= 0) {
    tasks[existingIndex] = task;
  } else {
    tasks.push(task);
  }
  
  saveTasks(tasks);
};

/**
 * Deletes a task from local storage
 */
export const deleteTask = (taskId: string): void => {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  saveTasks(filteredTasks);
};

/**
 * Updates a reminder completion status
 */
export const updateReminderStatus = (taskId: string, reminderId: string, isCompleted: boolean): void => {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex >= 0) {
    const task = tasks[taskIndex];
    
    // Update the reminder status
    const reminderIndex = task.reminders.findIndex(reminder => reminder.id === reminderId);
    if (reminderIndex >= 0) {
      task.reminders[reminderIndex].isCompleted = isCompleted;
    }
    
    // Update the completed reminders list
    if (isCompleted && !task.completedReminders.includes(reminderId)) {
      task.completedReminders.push(reminderId);
    } else if (!isCompleted) {
      task.completedReminders = task.completedReminders.filter(id => id !== reminderId);
    }
    
    // Save the updated tasks
    saveTasks(tasks);
  }
};
