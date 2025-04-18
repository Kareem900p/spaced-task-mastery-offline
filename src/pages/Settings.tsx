
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BellIcon, MoonIcon, SunIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-6">الإعدادات</h1>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellIcon className="h-5 w-5" />
            <Label htmlFor="notifications">التنبيهات</Label>
          </div>
          <Switch id="notifications" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SunIcon className="h-5 w-5" />
            <Label htmlFor="theme">المظهر الداكن</Label>
          </div>
          <Switch id="theme" />
        </div>
      </Card>
    </div>
  );
};

export default Settings;
