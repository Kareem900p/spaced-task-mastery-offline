import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BrainCircuitIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <BrainCircuitIcon className="h-16 w-16 text-primary/50 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">عفواً! الصفحة غير موجودة</p>
        <Button asChild>
          <a href="/" className="flex items-center justify-center gap-2">
            <HomeIcon className="h-4 w-4" />
            <span>العودة للصفحة الرئيسية</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
