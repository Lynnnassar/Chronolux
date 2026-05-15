import Sidebar from "./Sidebar";
import { User, Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="relative w-96 hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">
                  {user?.fullName || "Admin"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {user?.email || "admin@chronolux.com"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <button
                onClick={logout}
                className="text-slate-400 hover:text-red-500 transition-colors ml-2"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 animate-in fade-in duration-500">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
