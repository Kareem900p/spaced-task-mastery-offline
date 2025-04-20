
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
import Index from "./pages/Index";

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TaskProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TaskProvider>
    </TooltipProvider>
  </BrowserRouter>
);

export default App;
