
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ListTodo } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F7FA] p-6 text-center" dir="rtl">
      <ListTodo className="h-20 w-20 text-[#2E5BFF] mb-6" />
      <h1 className="text-3xl font-bold mb-4 text-[#2E5BFF]">نظام إدارة المهام</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        تطبيق مخصص لإتقان المهارات و حفظ المعلومات من خلال التكرار المتباعد للمراجعة
      </p>
      <Button 
        onClick={() => navigate('/home')} 
        className="text-lg px-8 py-6 bg-[#2E5BFF] hover:bg-[#2E5BFF]/90"
        size="lg"
      >
        ابدأ الآن
      </Button>
    </div>
  );
};

export default Index;
