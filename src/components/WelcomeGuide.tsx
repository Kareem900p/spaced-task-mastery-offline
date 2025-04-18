
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
import { BrainCircuitIcon, ClockIcon, BellRingIcon, CalendarIcon } from 'lucide-react';

interface WelcomeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeGuide: React.FC<WelcomeGuideProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <BrainCircuitIcon className="h-10 w-10 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            مرحباً بك في تطبيق إتقان المهام
          </DialogTitle>
          <DialogDescription className="text-center">
            تطبيق يساعدك على إتقان المهام عبر طريقة التكرار المتباعد 
            ويعمل بدون اتصال بالإنترنت
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex gap-4 items-start">
            <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">حدد المهام التي تريد إتقانها</h3>
              <p className="text-muted-foreground text-sm">
                أضف المهام الخاصة بك مع تحديد الوقت والتاريخ المناسب للبدء
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
              <ClockIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">جدولة التكرار المتباعد</h3>
              <p className="text-muted-foreground text-sm">
                سيقوم التطبيق تلقائياً بإنشاء جدول للتكرار المتباعد (بعد 1، 2، 3، 5، 7، 14، و30 يوماً)
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
              <BellRingIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">تلقي التنبيهات في الوقت المناسب</h3>
              <p className="text-muted-foreground text-sm">
                ستتلقى تنبيهات قبل بدء المهمة وفي أوقات المراجعة المجدولة، حتى عند إغلاق التطبيق
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            البدء باستخدام التطبيق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeGuide;
