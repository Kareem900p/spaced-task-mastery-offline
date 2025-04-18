
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  BellIcon, 
  MoonIcon, 
  SunIcon, 
  GlobeIcon, 
  Trash2Icon,
  UserIcon,
  InfoIcon,
  ArrowLeftIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState<string>('العربية');
  const [notificationTime, setNotificationTime] = useState<number>(15);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(true);
  const [autoSave, setAutoSave] = useState<boolean>(true);
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);

  const handleLanguageChange = () => {
    const newLanguage = language === 'العربية' ? 'الإنجليزية' : 'العربية';
    setLanguage(newLanguage);
    toast({
      title: "تم تغيير اللغة",
      description: `تم تغيير اللغة إلى ${newLanguage}`,
    });
  };

  const handleDeleteConfirm = () => {
    // هنا يمكن إضافة منطق حذف البيانات
    toast({
      title: "تم حذف البيانات",
      description: "تم حذف جميع البيانات بنجاح",
    });
    setIsDeleteDialogOpen(false);
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <GlobeIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="language" className="text-base font-medium">تغيير لغة التطبيق</Label>
              <p className="text-sm text-muted-foreground">اللغة الحالية: {language}</p>
            </div>
          </div>
          <Switch 
            id="language"
            checked={language === 'الإنجليزية'} 
            onCheckedChange={handleLanguageChange}
          />
        </div>
      </Card>

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

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Trash2Icon className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <Label className="text-base font-medium">حذف البيانات</Label>
              <p className="text-sm text-muted-foreground">حذف جميع البيانات من التطبيق</p>
            </div>
          </div>
        </div>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          حذف جميع البيانات
        </Button>
      </Card>

      <Card className="p-4">
        <h3 className="text-base font-medium mb-4">إعدادات إضافية</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-2">
              <BellIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">الإشعارات</span>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-2">
              <MoonIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">الوضع الليلي</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm">حفظ البيانات تلقائياً</span>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">تحديثات تلقائية</span>
            <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-base font-medium mb-3">معلومات الحساب</h3>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <UserIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium">أحمد محمد</h4>
            <p className="text-xs text-muted-foreground">ahmed.mohammed@example.com</p>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          تعديل الملف الشخصي
        </Button>
      </Card>

      <Card className="p-4">
        <h3 className="text-base font-medium mb-3">معلومات التطبيق</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">الإصدار</span>
            <span className="text-sm">2.5.1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">آخر تحديث</span>
            <span className="text-sm">١٨ أبريل ٢٠٢٥</span>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            التحقق من التحديثات
          </Button>
        </div>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              <Trash2Icon className="h-5 w-5" />
              تأكيد الحذف
            </DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
