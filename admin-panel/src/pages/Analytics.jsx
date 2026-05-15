import { TrendingUp, PieChart, Calendar } from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Analytics</h2>
          <p className="text-slate-500 text-sm">Deep dive into your business performance.</p>
        </div>
        <div className="flex items-center space-x-4 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
          <Calendar size={18} className="text-slate-400 ml-2" />
          <select className="bg-transparent border-none text-sm font-bold text-slate-900 focus:ring-0 cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center space-y-4">
          <TrendingUp size={48} className="text-slate-100" />
          <p className="text-slate-400 font-medium">Sales Revenue Chart (Coming Soon)</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center space-y-4">
          <PieChart size={48} className="text-slate-100" />
          <p className="text-slate-400 font-medium">Sales by Brand (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
