
import { useParams } from "react-router-dom";
import { TaskProvider } from "@/contexts/TaskContext";
import { TaskView } from "@/components/TaskView";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TaskManagement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#2E5BFF]">تفاصيل المهمة</h1>
        <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
          <Settings className="h-6 w-6 text-gray-600" />
        </Button>
      </header>

      <TaskProvider>
        <TaskView taskId={id} />
      </TaskProvider>
    </div>
  );
};

export default TaskManagement;
