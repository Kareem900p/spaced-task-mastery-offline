
import React, { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import EmptyState from './EmptyState';
import { ClockIcon, PlusIcon } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';

const TaskList = () => {
  const { tasks, isLoading, removeTask } = useTaskContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="animate-pulse-slow bg-primary/20 rounded-full p-6 mb-4">
          <ClockIcon className="h-12 w-12 text-primary/70" />
        </div>
        <h3 className="text-xl font-medium mb-2">جارِ التحميل...</h3>
        <p className="text-muted-foreground">يتم جلب المهام الخاصة بك</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-[#2E5BFF]">المهام المجدولة</h1>
      </header>
      
      <main className="p-4">
        {tasks.length === 0 ? (
          <EmptyState onAddTask={() => setIsFormOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task}
                onDelete={removeTask}
              />
            ))}
          </div>
        )}
      </main>
      
      <button
        className="fixed bottom-20 right-6 w-14 h-14 bg-[#2E5BFF] rounded-full flex items-center justify-center shadow-lg shadow-blue-300/40"
        onClick={() => setIsFormOpen(true)}
      >
        <PlusIcon className="h-6 w-6 text-white" />
      </button>
      
      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default TaskList;
