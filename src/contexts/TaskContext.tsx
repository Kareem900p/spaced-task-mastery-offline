
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types/task';
import { loadTasks, saveTask, deleteTask, updateReminderStatus } from '../services/localStorageService';
import { initializeNotifications, scheduleTaskReminders, clearTaskReminders } from '../services/notificationService';
import { createTask } from '../utils/taskUtils';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, mainTime: Date, expectedDuration: number) => void;
  removeTask: (taskId: string) => void;
  updateTask: (task: Task) => void;
  completeReminder: (taskId: string, reminderId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
  isLoading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks on initial mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const loadedTasks = loadTasks();
        setTasks(loadedTasks);
        
        // Initialize notifications system
        await initializeNotifications(loadedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = (title: string, mainTime: Date, expectedDuration: number) => {
    const newTask = createTask(title, mainTime, expectedDuration);
    setTasks(prevTasks => [...prevTasks, newTask]);
    saveTask(newTask);
    scheduleTaskReminders(newTask);
  };

  const removeTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    deleteTask(taskId);
    clearTaskReminders(taskId);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
    saveTask(updatedTask);
    
    // Reschedule reminders for the updated task
    clearTaskReminders(updatedTask.id);
    scheduleTaskReminders(updatedTask);
  };

  const completeReminder = (taskId: string, reminderId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            reminders: task.reminders.map(reminder => 
              reminder.id === reminderId 
                ? { ...reminder, isCompleted: true } 
                : reminder
            ),
            completedReminders: [...task.completedReminders, reminderId]
          };
        }
        return task;
      })
    );
    
    updateReminderStatus(taskId, reminderId, true);
  };

  const getTaskById = (taskId: string) => {
    return tasks.find(task => task.id === taskId);
  };

  const value = {
    tasks,
    addTask,
    removeTask,
    updateTask,
    completeReminder,
    getTaskById,
    isLoading
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
