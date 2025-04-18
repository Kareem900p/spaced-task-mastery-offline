
import React, { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { ClockIcon } from 'lucide-react';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose }) => {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [duration, setDuration] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() && selectedDate) {
      // Create a date object with the selected date and time
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const mainTime = new Date(selectedDate);
      mainTime.setHours(hours, minutes, 0, 0);
      
      // Add the task
      addTask(title, mainTime, duration);
      
      // Reset the form
      setTitle('');
      setSelectedDate(new Date());
      setSelectedTime('12:00');
      setDuration(1);
      
      // Close the dialog
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة مهمة جديدة</DialogTitle>
          <DialogDescription>
            أدخل تفاصيل المهمة التي تريد إتقانها باستخدام التكرار المتباعد.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان المهمة</Label>
            <Input
              id="title"
              type="text"
              placeholder="مثال: مراجعة درس الرياضيات"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>تاريخ المهمة الرئيسي</Label>
            <div className="border rounded-md p-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={ar}
                className="mx-auto"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">وقت المهمة</Label>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <ClockIcon className="h-5 w-5 text-gray-500" />
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="ltr"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="duration">المدة المتوقعة: {duration} ساعة</Label>
            </div>
            <Slider
              id="duration"
              min={1}
              max={5}
              step={1}
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
              className="py-4"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">إضافة المهمة</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
