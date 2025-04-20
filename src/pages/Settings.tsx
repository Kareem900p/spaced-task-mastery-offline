
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  BellIcon, 
  MoonIcon, 
  ArrowLeftIcon,
  SunIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get settings from localStorage or use defaults
  const getInitialSettings = () => {
    try {
      const savedSettings = localStorage.getItem('app_settings');
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
    return {
      notifications: true,
      darkMode: false,
      notificationTime: 15
    };
  };
  
  const [settings, setSettings] = useState(getInitialSettings);
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
  }, [settings]);

  const handleDarkModeChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, darkMode: checked }));
    
    // Apply dark mode to document
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: checked ? "تم تفعيل الوضع الليلي" : "تم إلغاء الوضع الليلي",
      description: checked ? "تم تفعيل الوضع الليلي بنجاح" : "تم إلغاء الوضع الليلي بنجاح",
    });
  };

  const handleNotificationsChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, notifications: checked }));
    
    toast({
      title: checked ? "تم تفعيل الإشعارات" : "تم إلغاء الإشعارات",
      description: checked ? "سيتم إرسال إشعارات للمهام القادمة" : "لن يتم إرسال إشعارات للمهام القادمة",
    });
  };
  
  const handleNotificationTimeChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, notificationTime: value[0] }));
  };

  // Apply dark mode on initial load
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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
            defaultValue={[settings.notificationTime]}
            max={30}
            min={15}
            step={5}
            onValueChange={handleNotificationTimeChange}
          />
          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-primary">
              التنبيه قبل {settings.notificationTime} دقيقة من الموعد
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
          <Switch 
            checked={settings.notifications} 
            onCheckedChange={handleNotificationsChange} 
          />
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            {settings.darkMode ? (
              <MoonIcon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <SunIcon className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="text-sm">الوضع الليلي</span>
          </div>
          <Switch 
            checked={settings.darkMode} 
            onCheckedChange={handleDarkModeChange} 
          />
        </div>
      </Card>
    </div>
  );
};

export default Settings;
