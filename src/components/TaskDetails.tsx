
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '../contexts/TaskContext';
import { TaskView } from './TaskView';

interface TaskDetailsProps {
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId, isOpen, onClose }) => {
  const { getTaskById } = useTaskContext();
  
  if (!taskId) return null;
  
  const task = getTaskById(taskId);
  if (!task) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{task.title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          <TaskView taskId={taskId} />
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="w-full">
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetails;
