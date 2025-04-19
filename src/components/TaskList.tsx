
import React, { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import EmptyState from './EmptyState';
import { ClockIcon, PlusIcon, Settings, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TaskList = () => {
  const { tasks, isLoading } = useTaskContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleTaskClick = (taskId: string) => {
    navigate(`/task/${taskId}`);
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
          <div className="grid grid-cols-1 gap-4">
            {tasks.map(task => {
              const completedCount = task.completedReminders.length;
              const totalCount = task.reminders.length;
              const progress = Math.round((completedCount / totalCount) * 100);
              
              return (
                <Card 
                  key={task.id} 
                  className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => handleTaskClick(task.id)}
                >
                  <CardContent className="p-0">
                    <div className="bg-primary/10 p-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                        <Badge variant="outline" className="bg-primary/20 text-primary">
                          {task.expectedDuration} ساعة
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mt-2 gap-3">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          <span className="text-sm">
                            {new Date(task.mainTime).toLocaleTimeString('ar-SA', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            {new Date(task.mainTime).toLocaleDateString('ar-SA', {
                              day: 'numeric',
                              month: 'long'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          التقدم: {completedCount} من {totalCount}
                        </span>
                        <span className={`font-medium ${progress === 100 ? 'text-green-600' : 'text-primary'}`}>
                          {progress}%
                        </span>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">اضغط للتفاصيل والفترات الزمنية</span>
                        <div className={`w-3 h-3 rounded-full ${
                          completedCount > 0 ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
