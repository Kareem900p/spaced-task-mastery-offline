
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ListTodo } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4">
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold text-center text-[#2E5BFF] mb-6">مرحباً بك في تطبيق المهام</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center space-y-4">
            <ListTodo className="h-16 w-16 text-[#2E5BFF]" />
            <h2 className="text-xl font-semibold text-gray-800">ابدأ بإدارة مهامك</h2>
            <p className="text-gray-600 text-center">
              قم بتنظيم مهامك وتتبع تقدمك بسهولة
            </p>
            <Button 
              className="w-full mt-4"
              onClick={() => navigate('/tasks')}
            >
              استعرض المهام
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
