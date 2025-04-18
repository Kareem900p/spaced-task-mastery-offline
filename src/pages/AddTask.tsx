
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  return (
    <div className="container py-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-6">إضافة مهمة جديدة</h1>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="title">عنوان المهمة</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="أدخل عنوان المهمة"
            />
          </div>

          <Button 
            className="w-full mt-6"
            onClick={() => navigate("/tasks")}
          >
            إضافة المهمة
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddTask;
