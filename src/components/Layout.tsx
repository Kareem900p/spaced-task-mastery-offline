
import { Link, Outlet, useLocation } from "react-router-dom";
import { HomeIcon, ListTodoIcon, SettingsIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Layout = () => {
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "الرئيسية", icon: HomeIcon },
    { path: "/tasks", label: "المهام", icon: ListTodoIcon },
    { path: "/add-task", label: "إضافة", icon: PlusIcon },
    { path: "/settings", label: "الإعدادات", icon: SettingsIcon },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background" dir="rtl">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full border-t bg-background">
        <div className="grid h-16 grid-cols-4">
          {navigationItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-xs",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
