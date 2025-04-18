
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Task } from '../types/task';
import { getFormattedReminderDate, getFormattedReminderTime, getUpcomingReminders } from '../utils/taskUtils';
import { ClockIcon, CalendarIcon, CheckIcon, TrashIcon, SearchIcon } from 'lucide-react';
import { useTaskContext } from '../contexts/TaskContext';
import DeleteConfirmation from './DeleteConfirmation';
import TaskDetails from './TaskDetails';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const { completeReminder } = useTaskContext();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const upcomingReminders = getUpcomingReminders(task);
  const mainDate = getFormattedReminderDate(task.mainTime);
  const mainTime = getFormattedReminderTime(task.mainTime);
  
  const completedCount = task.completedReminders.length;
  const totalCount = task.reminders.length;
  const progress = Math.round((completedCount / totalCount) * 100);
  
  const handleCompleteReminder = (reminderId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    completeReminder(task.id, reminderId);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    onDelete(task.id);
    setIsDeleteDialogOpen(false);
  };
  
  const handleCardClick = () => {
    setIsDetailsOpen(true);
  };
  
  const nextReminder = upcomingReminders.length > 0 ? upcomingReminders[0] : null;
  
  return (
    <>
      <Card className="task-card cursor-pointer hover:border-primary/50" onClick={handleCardClick}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{task.title}</CardTitle>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {task.expectedDuration} ساعة
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-2 text-sm mt-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{mainDate}</span>
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>{mainTime}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="w-full bg-secondary rounded-full h-2.5 my-4">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-sm text-muted-foreground mb-3">
            <span>اكتمال التكرارات: </span>
            <span className="font-medium">{completedCount}</span>
            <span> من </span>
            <span className="font-medium">{totalCount}</span>
            <span> ({progress}%)</span>
          </div>
          
          {nextReminder && (
            <div className="bg-accent p-3 rounded-md mt-2">
              <h4 className="font-medium mb-1">المراجعة القادمة:</h4>
              <p className="text-sm">{getFormattedReminderDate(nextReminder.scheduledTime)}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">{getFormattedReminderTime(nextReminder.scheduledTime)}</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8"
                  onClick={(e) => handleCompleteReminder(nextReminder.id, e)}
                >
                  <CheckIcon className="h-4 w-4 ml-1" />
                  <span>تم</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-2">
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 mt-2 flex-1"
              onClick={handleCardClick}
            >
              <SearchIcon className="h-4 w-4 ml-1" />
              <span>التفاصيل</span>
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              className="h-8 mt-2 flex-1" 
              onClick={handleDeleteClick}
            >
              <TrashIcon className="h-4 w-4 ml-1" />
              <span>حذف</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <DeleteConfirmation 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title={task.title}
      />
      
      <TaskDetails
        taskId={task.id}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
};

export default TaskCard;
