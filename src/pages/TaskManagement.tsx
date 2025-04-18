
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TaskView } from "@/components/TaskView";
import { TaskProvider } from "@/contexts/TaskContext";

const TaskManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">تفاصيل المهمة</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          العودة
        </Button>
      </div>

      <TaskProvider>
        <TaskView />
      </TaskProvider>
    </div>
  );
};

export default TaskManagement;
