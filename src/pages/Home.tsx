
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ListTodo, Plus, Settings, Calendar, CheckCircle } from 'lucide-react';
import TaskForm from '@/components/TaskForm';
import { useTaskContext } from '@/contexts/TaskContext';
import EmptyState from '@/components/EmptyState';

const Home = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { tasks } = useTaskContext();

  // Get counts for today's and upcoming tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.mainTime);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });

  const upcomingTasks = tasks.filter(task => {
    const taskDate = new Date(task.mainTime);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() > today.getTime();
  });

  const completedTasks = tasks.filter(task => {
    return task.completedReminders.length > 0;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2E5BFF]">نظام إدارة المهام</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-6 w-6 text-gray-600" />
        </Button>
      </header>

      <div className="max-w-lg mx-auto mb-6">
        <Card className="bg-gradient-to-r from-[#2E5BFF]/90 to-[#4776FF]/90 text-white shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <ListTodo className="h-16 w-16 mb-4" />
              <h2 className="text-xl font-semibold mb-2">نظام التكرار المتباعد</h2>
              <p className="mb-6">
                تطبيق مخصص لإتقان مهاراتك و حفظ المعلومات من خلال التكرار المتباعد للمراجعة
              </p>
              <Button 
                className="w-full bg-white text-[#2E5BFF] hover:bg-white/90"
                onClick={() => setIsFormOpen(true)}
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة مهمة جديدة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {tasks.length === 0 ? (
        <EmptyState onAddTask={() => setIsFormOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-[#2E5BFF]" />
                </div>
                <div>
                  <h3 className="font-medium">مهام اليوم</h3>
                  <p className="text-sm text-muted-foreground">{todayTasks.length} مهمة</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/tasks')}
              >
                عرض مهام اليوم
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">المهام المكتملة</h3>
                  <p className="text-sm text-muted-foreground">{completedTasks.length} مهمة</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/tasks')}
              >
                عرض المهام المكتملة
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">المهام القادمة</h2>
          <Button 
            variant="ghost" 
            className="text-sm text-[#2E5BFF]"
            onClick={() => navigate('/tasks')}
          >
            عرض الكل
          </Button>
        </div>
        
        {upcomingTasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">لا توجد مهام قادمة</p>
        ) : (
          <div className="space-y-3">
            {upcomingTasks.slice(0, 3).map(task => (
              <Card 
                key={task.id}
                className="cursor-pointer hover:border-primary/50"
                onClick={() => navigate(`/task/${task.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{task.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(task.mainTime).toLocaleDateString('ar-SA', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Home;
