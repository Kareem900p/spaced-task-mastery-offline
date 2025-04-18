
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTaskContext } from "../contexts/TaskContext";
import { CheckCircle, Circle } from "lucide-react";

const TaskManagement = () => {
  const { tasks } = useTaskContext();

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">المهام</h1>
        <Button variant="outline" onClick={() => window.location.href = '/add-task'}>
          إضافة مهمة
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-center gap-4">
              {task.completedReminders.length === task.reminders.length ? (
                <CheckCircle className="h-6 w-6 text-primary" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground" />
              )}
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {task.completedReminders.length} من {task.reminders.length} تم إكمالها
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
