
import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { ClockIcon } from 'lucide-react';

interface TaskListProps {
  onAddTask: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ onAddTask }) => {
  const { tasks, removeTask, isLoading } = useTaskContext();
  
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
  
  if (tasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onDelete={removeTask} 
        />
      ))}
    </div>
  );
};

export default TaskList;
