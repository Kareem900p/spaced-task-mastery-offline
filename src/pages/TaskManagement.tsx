
import { useParams, useNavigate } from "react-router-dom";
import { TaskView } from "@/components/TaskView";
import { ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const TaskManagement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="text-xl font-bold text-[#2E5BFF]">الفترات الزمنية للمهمة</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
          <Settings className="h-6 w-6 text-gray-600" />
        </Button>
      </header>

      <TaskView taskId={id} />
    </div>
  );
};

export default TaskManagement;
