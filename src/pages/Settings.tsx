
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  BellIcon, 
  MoonIcon, 
  ArrowLeftIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notificationTime, setNotificationTime] = useState<number>(15);

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    toast({
      title: checked ? "تم تفعيل الوضع الليلي" : "تم إلغاء الوضع الليلي",
      description: checked ? "تم تفعيل الوضع الليلي بنجاح" : "تم إلغاء الوضع الليلي بنجاح",
    });
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: checked ? "تم تفعيل الإشعارات" : "تم إلغاء الإشعارات",
      description: checked ? "سيتم إرسال إشعارات للمهام القادمة" : "لن يتم إرسال إشعارات للمهام القادمة",
    });
  };

  return (
    <div className="container py-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">الإعدادات</h1>
        <Button variant="outline" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          العودة
        </Button>
      </div>
      
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <BellIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <Label className="text-base font-medium">تخصيص وقت التنبيهات</Label>
            <p className="text-sm text-muted-foreground">تعديل الفترات المسبقة للتنبيهات</p>
          </div>
        </div>
        
        <div className="px-4 py-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">١٥ دقيقة</span>
            <span className="text-sm text-muted-foreground">٣٠ دقيقة</span>
          </div>
          <Slider
            defaultValue={[notificationTime]}
            max={30}
            min={15}
            step={5}
            onValueChange={(value) => setNotificationTime(value[0])}
          />
          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-primary">
              التنبيه قبل {notificationTime} دقيقة من الموعد
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">الإشعارات</span>
          </div>
          <Switch checked={notifications} onCheckedChange={handleNotificationsChange} />
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <MoonIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">الوضع الليلي</span>
          </div>
          <Switch checked={darkMode} onCheckedChange={handleDarkModeChange} />
        </div>
      </Card>
    </div>
  );
};

export default Settings;
