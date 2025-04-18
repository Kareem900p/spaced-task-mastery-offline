
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Task, ReminderType } from '../types/task';
import {
  getFormattedReminderDate,
  getFormattedReminderTime,
  getReminderTypeText,
} from '../utils/taskUtils';
import { useTaskContext } from '../contexts/TaskContext';
import { ClockIcon, CalendarIcon, CheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TaskDetailsProps {
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId, isOpen, onClose }) => {
  const { getTaskById, completeReminder } = useTaskContext();
  
  if (!taskId) return null;
  
  const task = getTaskById(taskId);
  if (!task) return null;
  
  const mainDate = getFormattedReminderDate(task.mainTime);
  const mainTime = getFormattedReminderTime(task.mainTime);
  
  const completedCount = task.completedReminders.length;
  const totalCount = task.reminders.length;
  const progress = Math.round((completedCount / totalCount) * 100);
  
  const sortedReminders = [...task.reminders].sort(
    (a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime()
  );
  
  const handleCompleteReminder = (reminderId: string) => {
    completeReminder(task.id, reminderId);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{task.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{mainDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span>{mainTime}</span>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary ms-auto">
              {task.expectedDuration} ساعة
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">تقدم التكرارات</span>
            <span className="text-sm text-muted-foreground">
              {completedCount} من {totalCount} ({progress}%)
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5 mb-6">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mb-2">
            <h3 className="font-medium mb-2">جدول التكرارات:</h3>
            <ScrollArea className="h-[200px] rounded-md border p-2">
              <div className="space-y-3">
                {sortedReminders.map((reminder) => {
                  const isCompleted = 
                    reminder.isCompleted || task.completedReminders.includes(reminder.id);
                  const isPast = reminder.scheduledTime < new Date();
                  
                  return (
                    <div
                      key={reminder.id}
                      className={`flex items-center justify-between p-2 rounded-md ${
                        isCompleted 
                          ? 'bg-primary/10' 
                          : isPast 
                          ? 'bg-destructive/10' 
                          : 'bg-accent'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-sm mb-0.5">
                          {getReminderTypeText(reminder.type)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {getFormattedReminderDate(reminder.scheduledTime)} • {getFormattedReminderTime(reminder.scheduledTime)}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={isCompleted ? "ghost" : "outline"}
                        className="h-8"
                        disabled={isCompleted}
                        onClick={() => handleCompleteReminder(reminder.id)}
                      >
                        <CheckIcon className="h-3 w-3 ml-1" />
                        <span>{isCompleted ? "تم" : "إكمال"}</span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
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
