
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Clock, Calendar, ArrowLeftIcon } from "lucide-react";
import { useTaskContext } from "@/contexts/TaskContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export interface TimeInterval {
  id: string;
  day: number;
  completed: boolean;
  locked: boolean;
  label: string;
  date: Date;
}

interface TaskViewProps {
  taskId?: string | null;
}

const FIXED_INTERVALS: { day: number; label: string }[] = [
  { day: 1, label: "اليوم الأول" },
  { day: 2, label: "اليوم الثاني" },
  { day: 3, label: "اليوم الثالث" },
  { day: 5, label: "اليوم الخامس" },
  { day: 7, label: "اليوم السابع" },
  { day: 10, label: "اليوم العاشر" },
  { day: 15, label: "اليوم الخامس عشر" },
  { day: 20, label: "اليوم العشرون" },
  { day: 25, label: "اليوم الخامس والعشرون" },
  { day: 30, label: "اليوم الثلاثون" }
];

export const TaskView: React.FC<TaskViewProps> = ({ taskId }) => {
  const { tasks, getTaskById, completeReminder } = useTaskContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [intervals, setIntervals] = useState<TimeInterval[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(taskId || null);
  
  const selectedTask = selectedTaskId ? getTaskById(selectedTaskId) : null;
  
  useEffect(() => {
    if (taskId) {
      setSelectedTaskId(taskId);
    }
  }, [taskId]);
  
  // Generate intervals based on selected task
  useEffect(() => {
    if (selectedTask) {
      const mainTaskDate = new Date(selectedTask.mainTime);
      const today = new Date();
      
      // Create intervals with dates
      const taskIntervals = FIXED_INTERVALS.map(interval => {
        const intervalDate = new Date(mainTaskDate);
        intervalDate.setDate(mainTaskDate.getDate() + interval.day);
        
        // Calculate if this interval should be locked
        const isLocked = intervalDate > today;
        
        // Check if there's a reminder for this day that's already completed
        const dayReminder = selectedTask.reminders.find(reminder => {
          const reminderDate = new Date(reminder.scheduledTime);
          const daysDiff = Math.floor((reminderDate.getTime() - mainTaskDate.getTime()) / (1000 * 60 * 60 * 24));
          return daysDiff === interval.day;
        });
        
        const isCompleted = dayReminder ? 
          (dayReminder.isCompleted || selectedTask.completedReminders.includes(dayReminder.id)) : 
          false;
        
        return {
          id: interval.day.toString(),
          day: interval.day,
          completed: isCompleted,
          locked: isLocked,
          label: interval.label,
          date: intervalDate
        };
      });
      
      setIntervals(taskIntervals);
    }
  }, [selectedTask]);

  useEffect(() => {
    // When loading the component, select first task if none selected
    if (tasks.length > 0 && !selectedTaskId) {
      setSelectedTaskId(tasks[0].id);
    }
  }, [tasks, selectedTaskId]);

  if (!selectedTask) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-xl font-medium mb-4">لم يتم العثور على المهمة</h2>
        <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
      </div>
    );
  }

  const completedCount = intervals.filter(i => i.completed).length;
  const completionPercentage = Math.round((completedCount / intervals.length) * 100);

  const toggleComplete = (id: string) => {
    const interval = intervals.find(i => i.id === id);
    
    if (interval?.locked) {
      toast({
        title: "هذا اليوم مقفل",
        description: "لا يمكن تحديد هذا اليوم كمكتمل حتى يحين موعده",
        variant: "destructive"
      });
      return;
    }
    
    // Find the corresponding reminder for this interval day
    if (selectedTask) {
      const mainTaskDate = new Date(selectedTask.mainTime);
      const interval = intervals.find(i => i.id === id);
      
      if (interval) {
        const dayReminder = selectedTask.reminders.find(reminder => {
          const reminderDate = new Date(reminder.scheduledTime);
          const daysDiff = Math.floor((reminderDate.getTime() - mainTaskDate.getTime()) / (1000 * 60 * 60 * 24));
          return daysDiff === interval.day;
        });
        
        if (dayReminder && !dayReminder.isCompleted && !selectedTask.completedReminders.includes(dayReminder.id)) {
          completeReminder(selectedTask.id, dayReminder.id);
          
          // Update the local state
          setIntervals(prev => prev.map(i => {
            if (i.id === id) {
              return { ...i, completed: true };
            }
            return i;
          }));
          
          toast({
            title: "تم إكمال المراجعة",
            description: `تم تحديد ${interval.label} كمكتمل`,
          });
        }
      }
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6 p-4">
      <Card className="p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-2">{selectedTask.title}</h2>
          <p className="text-sm text-muted-foreground mb-2">
            تاريخ البدء: {formatDate(new Date(selectedTask.mainTime))}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            برنامج المراجعة المتباعدة لإتقان المهمة
          </p>
          
          <div className="relative w-36 h-36 flex items-center justify-center mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">
                  {completionPercentage}%
                </span>
                <p className="text-sm text-muted-foreground">مكتمل</p>
              </div>
            </div>
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth="12"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                fill="transparent"
                stroke="#2E5BFF"
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={2 * Math.PI * 60 * (1 - completionPercentage / 100)}
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <div className="w-full flex justify-between text-sm text-muted-foreground">
            <span>{completedCount} مكتمل</span>
            <span>{intervals.length} إجمالي</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">جدول المراجعات</h3>
      </div>

      <div className="space-y-3">
        {intervals.map(interval => (
          <Card 
            key={interval.id} 
            className={`p-4 ${interval.completed ? 'border-primary' : ''} ${interval.locked ? 'bg-gray-100' : ''}`}
          >
            <div className="flex items-center justify-between">
              {interval.locked ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground cursor-not-allowed"
                  disabled
                >
                  <Lock className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className={interval.completed ? 'text-primary' : 'text-muted-foreground'}
                  onClick={() => toggleComplete(interval.id)}
                >
                  <CheckCircle className="h-5 w-5" />
                </Button>
              )}
              
              <div className="flex-1 mx-4">
                <div className="font-medium">
                  {interval.label}
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 inline-block ml-1" />
                  {formatDate(interval.date)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskView;
