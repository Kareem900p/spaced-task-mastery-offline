
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskList from "./components/TaskList";
import TaskManagement from "./pages/TaskManagement";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { TaskProvider } from "./contexts/TaskContext";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
