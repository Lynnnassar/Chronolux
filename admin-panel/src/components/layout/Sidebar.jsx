import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Watch,
  Award,
  Layers,
  Tag,
  Package,
  ShoppingCart,
  Users,
  Image as ImageIcon,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "../../lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Products", path: "/products", icon: Watch },
    { name: "Brands", path: "/brands", icon: Award },
    { name: "Collections", path: "/collections", icon: Layers },
    { name: "Categories", path: "/categories", icon: Tag },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Customers", path: "/customers", icon: Users },
    { name: "Media Library", path: "/media", icon: ImageIcon },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen fixed left-0 top-0 hidden lg:block border-r border-slate-800">
      <div className="p-8">
        <h1 className="text-xl font-bold tracking-widest text-white uppercase font-serif">
          ChronoLux{" "}
          <span className="text-[10px] bg-white text-black px-1 ml-1 align-top rounded">
            Admin
          </span>
        </h1>
      </div>

      <nav className="px-4 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-slate-800 text-white shadow-lg"
                      : "hover:bg-slate-800/50 hover:text-white",
                  )}
                >
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
