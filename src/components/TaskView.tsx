
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock } from "lucide-react";
import { useTaskContext } from "@/contexts/TaskContext";
import { useToast } from "@/components/ui/use-toast";

export interface TimeInterval {
  id: string;
  day: number;
  completed: boolean;
  locked: boolean;
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

// تاريخ بداية التطبيق - قمنا باستخدام تاريخ اليوم
const START_DATE = new Date(2025, 3, 18); // 18 أبريل 2025

export const TaskView = () => {
  const { tasks } = useTaskContext();
  const { toast } = useToast();
  const [intervals, setIntervals] = useState<TimeInterval[]>([]);
  const [currentTask, setCurrentTask] = useState<string>("تطوير واجهة المستخدم");
  const [currentDescription, setCurrentDescription] = useState<string>("كل يوم خطوة نحو النجاح والتميز");
  
  // التحقق من التاريخ وتحديث القفل للأيام
  useEffect(() => {
    // احتساب عدد الأيام منذ بداية التطبيق
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - START_DATE.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const updatedIntervals = FIXED_INTERVALS.map(interval => ({
      id: interval.day.toString(),
      day: interval.day,
      completed: false,
      // قفل الأيام التي لم يحن موعدها بعد
      locked: interval.day > diffDays + 1
    }));
    
    setIntervals(updatedIntervals);
  }, []);

  const completedCount = intervals.filter(i => i.completed).length;
  const completionPercentage = Math.round((completedCount / intervals.length) * 100);

  const toggleComplete = (id: string) => {
    setIntervals(prev => prev.map(i => {
      // إذا كان اليوم مقفلًا، لا يمكن تعديله
      if (i.id === id && !i.locked) {
        return { ...i, completed: !i.completed };
      }
      return i;
    }));
    
    // إذا كان اليوم الذي تم النقر عليه مقفلًا، أظهر رسالة
    const clickedInterval = intervals.find(i => i.id === id);
    if (clickedInterval?.locked) {
      toast({
        title: "هذا اليوم مقفل",
        description: "لا يمكن تحديد هذا اليوم كمكتمل حتى يحين موعده",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-2">{currentTask}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {currentDescription}
          </p>
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">
                  {completionPercentage}%
                </span>
                <p className="text-sm text-muted-foreground">مكتمل</p>
              </div>
            </div>
            <Progress value={completionPercentage} className="w-full" />
          </div>
          
          <div className="w-full flex justify-between text-sm text-muted-foreground">
            <span>{completedCount} مكتمل</span>
            <span>{intervals.length} إجمالي</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">الفترات الزمنية</h3>
      </div>

      <div className="space-y-3">
        {intervals.map(interval => {
          const intervalInfo = FIXED_INTERVALS.find(i => i.day === interval.day);
          return (
            <Card key={interval.id} className={`p-4 ${interval.completed ? 'border-primary' : ''} ${interval.locked ? 'bg-gray-100' : ''}`}>
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
                    {intervalInfo?.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    بعد {interval.day} {interval.day > 2 ? 'أيام' : 'يوم'}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TaskView;
