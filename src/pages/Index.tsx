import React, { useState, useEffect } from 'react';
import { TaskProvider, useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import WelcomeGuide from '../components/WelcomeGuide';
import { PlusIcon, BrainCircuitIcon } from 'lucide-react';

const IndexContent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const { tasks } = useTaskContext();
  
  // Check if first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setIsWelcomeOpen(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);
  
  const handleAddTaskClick = () => {
    setIsFormOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <header className="container mx-auto py-6 mb-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center mb-4">
            <BrainCircuitIcon className="h-10 w-10 text-primary ml-2" />
            <h1 className="text-3xl font-bold">إتقان المهام</h1>
          </div>
          <p className="text-muted-foreground max-w-lg">
            تطبيق لمساعدتك على إتقان المهام عبر طريقة التكرار المتباعد، مع تذكيرات ذكية وواجهة بسيطة تعمل بدون إنترنت.
          </p>
        </div>
      </header>

      <main className="container mx-auto">
        <TaskList onAddTask={handleAddTaskClick} />
      </main>

      <button
        className="floating-button"
        onClick={handleAddTaskClick}
        aria-label="إضافة مهمة جديدة"
      >
        <PlusIcon className="h-6 w-6" />
      </button>

      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <WelcomeGuide isOpen={isWelcomeOpen} onClose={() => setIsWelcomeOpen(false)} />
    </div>
  );
};

const Index = () => {
  return (
    <TaskProvider>
      <IndexContent />
    </TaskProvider>
  );
};

export default Index;
