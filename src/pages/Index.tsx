
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <Button onClick={() => navigate('/home')} className="text-lg">
        ابدأ الآن
      </Button>
    </div>
  );
};

export default Index;
