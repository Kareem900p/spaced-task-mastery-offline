
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusIcon, CheckCircle, PencilIcon, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useTaskContext } from "@/contexts/TaskContext";

export interface TimeInterval {
  id: string;
  days: number;
  date: string;
  completed: boolean;
}

export const TaskView = () => {
  const { tasks } = useTaskContext();
  const [showDialog, setShowDialog] = useState(false);
  const [intervals, setIntervals] = useState<TimeInterval[]>([
    { id: "1", days: 1, date: "2025-04-15", completed: true },
    { id: "2", days: 2, date: "2025-04-17", completed: true },
    { id: "3", days: 3, date: "2025-04-20", completed: false },
  ]);

  const [editingInterval, setEditingInterval] = useState<TimeInterval | null>(null);
  const [newDays, setNewDays] = useState<number>(1);
  const [newDate, setNewDate] = useState<string>("");

  const completedCount = intervals.filter(i => i.completed).length;
  const completionPercentage = Math.round((completedCount / intervals.length) * 100);

  const handleAddInterval = () => {
    setEditingInterval(null);
    setNewDays(1);
    setNewDate(new Date().toISOString().split("T")[0]);
    setShowDialog(true);
  };

  const handleEdit = (interval: TimeInterval) => {
    setEditingInterval(interval);
    setNewDays(interval.days);
    setNewDate(interval.date);
    setShowDialog(true);
  };

  const handleSave = () => {
    if (editingInterval) {
      setIntervals(prev => prev.map(i => 
        i.id === editingInterval.id 
          ? { ...i, days: newDays, date: newDate }
          : i
      ));
    } else {
      setIntervals(prev => [...prev, {
        id: Math.random().toString(),
        days: newDays,
        date: newDate,
        completed: false
      }]);
    }
    setShowDialog(false);
  };

  const handleDelete = (id: string) => {
    setIntervals(prev => prev.filter(i => i.id !== id));
  };

  const toggleComplete = (id: string) => {
    setIntervals(prev => prev.map(i => 
      i.id === id ? { ...i, completed: !i.completed } : i
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-2">تطوير واجهة المستخدم</h2>
          <p className="text-sm text-muted-foreground mb-4">
            إنشاء واجهة مستخدم تفاعلية للتطبيق الجديد
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
        <Button onClick={handleAddInterval}>
          <PlusIcon className="ml-2 h-4 w-4" />
          إضافة فترة
        </Button>
      </div>

      <div className="space-y-3">
        {intervals.map(interval => (
          <Card key={interval.id} className={`p-4 ${interval.completed ? 'border-primary' : ''}`}>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className={interval.completed ? 'text-primary' : 'text-muted-foreground'}
                onClick={() => toggleComplete(interval.id)}
              >
                <CheckCircle className="h-5 w-5" />
              </Button>
              
              <div className="flex-1 mx-4">
                <div className="font-medium">
                  {interval.days} {interval.days > 1 ? 'أيام' : 'يوم'}
                </div>
                <div className="text-sm text-muted-foreground">{interval.date}</div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(interval)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(interval.id)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingInterval ? "تعديل الفترة الزمنية" : "إضافة فترة زمنية جديدة"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>عدد الأيام</Label>
              <Input
                type="number"
                min="1"
                value={newDays}
                onChange={(e) => setNewDays(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label>التاريخ</Label>
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSave}>
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
