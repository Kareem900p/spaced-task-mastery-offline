
import React, { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { ClockIcon, PlusIcon, Settings, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';

const TaskList = () => {
  const { tasks, removeTask, isLoading } = useTaskContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleTaskClick = (taskId: string) => {
    navigate('/tasks');
  };
  
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
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#2E5BFF]">المهام المجدولة</h1>
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 text-gray-600"
        >
          <Settings className="h-6 w-6" />
        </button>
      </header>
      
      <main className="p-4">
        {tasks.length === 0 ? (
          <EmptyState onAddTask={() => setIsFormOpen(true)} />
        ) : (
          <div className="space-y-4">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className="bg-white rounded-xl shadow-sm p-4 cursor-pointer"
                onClick={() => handleTaskClick(task.id)}
              >
                <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                
                <div className="flex items-center text-gray-600 mt-2 space-x-3 rtl:space-x-reverse">
                  <ClockIcon className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(task.mainTime).toLocaleTimeString('ar-SA', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                  <span className="text-sm">المدة: {task.expectedDuration} ساعة</span>
                </div>
                
                <div className="flex items-center text-[#2E5BFF] mt-3">
                  <Calendar className="h-4 w-4 ml-2" />
                  <span className="text-sm">
                    القادم: {
                      new Date().toLocaleDateString('ar-SA', {
                        day: 'numeric',
                        month: 'long'
                      })
                    }
                  </span>
                </div>
                
                <div className="flex justify-end mt-1">
                  <div className={`w-3 h-3 rounded-full ${
                    task.completedReminders.length > 0 
                      ? 'bg-[#00C271]' 
                      : 'bg-gray-300'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#2E5BFF] rounded-full flex items-center justify-center shadow-lg shadow-blue-300/40"
        onClick={() => setIsFormOpen(true)}
      >
        <PlusIcon className="h-6 w-6 text-white" />
      </button>
      
      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default TaskList;
