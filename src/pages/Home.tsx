
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ListTodo, Plus } from 'lucide-react';
import TaskForm from '@/components/TaskForm';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4">
      <div className="max-w-lg mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center space-y-4">
            <ListTodo className="h-16 w-16 text-[#2E5BFF]" />
            <h2 className="text-xl font-semibold text-gray-800">نظام إدارة المهام</h2>
            <p className="text-gray-600 text-center">
              قم بإضافة وتنظيم مهامك بسهولة
            </p>
            <div className="flex flex-col w-full gap-2">
              <Button 
                className="w-full"
                onClick={() => setIsFormOpen(true)}
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة مهمة جديدة
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => navigate('/tasks')}
              >
                عرض المهام الحالية
              </Button>
            </div>
          </div>
        </div>
      </div>
      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Home;
