import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Package,
  LayoutGrid,
  ShoppingCart,
  Menu,
  LogOut,
  Briefcase,
  FileText,
  User
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Dashboard", icon: Home, link: "/admin" },
    {
      id: "products",
      label: "Products",
      icon: Package,
      link: "/admin/products",
    },
    {
      id: "categories",
      label: "Categories",
      icon: LayoutGrid,
      link: "/admin/category",
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
      link: "/admin/orders",
    },
    {
      id: "Jobs",
      label: "Jobs",
      icon: Briefcase,
      link: "/admin/jobs",
    },
    {
      id: "applications",
      label: "Applications",
      icon: FileText,
      link: "/admin/Application",
    },
    {
      id: "users",
      label: "Users",
      icon: User,
      link: "/admin/users",
    },
  ];
  const SidebarContent = ({ mobile = false }) => (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-950 text-slate-50",
        mobile ? "w-full" : "w-64"
      )}
    >
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.link;

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start py-2 px-3 text-slate-300 hover:text-slate-50 hover:bg-slate-800",
                  isActive && "bg-slate-800 text-slate-50"
                )}
                onClick={() => navigate(item.link)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          className="w-full justify-start py-2 px-3 text-slate-300 hover:text-slate-50 hover:bg-slate-800"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile View Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-slate-950 text-slate-50 px-4 py-3 flex items-center justify-between shadow-md">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-slate-800">
            <SidebarContent mobile />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block fixed top-0 left-0 h-screen border-r border-slate-800">
        <SidebarContent />
      </div>

      <div className="lg:ml-64 min-h-screen">
        <div className="lg:hidden h-14" />
          <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default SideBar;
