
import React from 'react';
import { BrainCircuitIcon } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  onAddTask: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddTask }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping opacity-75"></div>
        <div className="relative bg-primary/10 rounded-full p-6">
          <BrainCircuitIcon className="h-16 w-16 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-3">لا توجد مهام بعد</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        ابدأ رحلتك لإتقان المهام عبر التكرار المتباعد. أضف مهمتك الأولى واترك التطبيق يقوم بجدولة التذكيرات تلقائياً.
      </p>
      
      <Button size="lg" onClick={onAddTask}>
        أضف مهمتك الأولى
      </Button>
    </div>
  );
};

export default EmptyState;
