import { DollarSign, ShoppingCart, Users, Package, Watch, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config";

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, isLoading }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-xl text-slate-900">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      {!isLoading && trendValue !== undefined && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
        }`}>
          {trend === 'up' ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
          {trendValue}%
        </span>
      )}
    </div>
    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">{title}</p>
    {isLoading ? (
      <div className="h-8 w-24 bg-slate-100 animate-pulse rounded"></div>
    ) : (
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
    )}
  </div>
);

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axios.get(`${config.API_BASE_URL}/analytics/dashboard`);
      return response.data;
    }
  });

  const stats = data?.stats || {};

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-500">Welcome back, here's what's happening today.</p>
        </div>
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value={`$${stats.totalRevenue?.toLocaleString()}`} 
          icon={DollarSign} 
          trend="up" 
          trendValue="12"
          isLoading={isLoading}
        />
        <StatsCard 
          title="Total Orders" 
          value={stats.ordersCount} 
          icon={ShoppingCart} 
          trend="up" 
          trendValue="8"
          isLoading={isLoading}
        />
        <StatsCard 
          title="Total Customers" 
          value={stats.customersCount} 
          icon={Users} 
          trend="up" 
          trendValue="5"
          isLoading={isLoading}
        />
        <StatsCard 
          title="Total Products" 
          value={stats.productsCount} 
          icon={Package} 
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
            <Link to="/orders" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">View All</Link>
          </div>
          <div className="space-y-4 flex-1">
            {isLoading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl"></div>)
            ) : data?.recentOrders?.length > 0 ? (
              data.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold uppercase">
                      {order.user?.name?.substring(0, 2) || 'GU'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{order.user?.name || 'Guest User'}</p>
                      <p className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">${order.totalPrice?.toLocaleString()}</p>
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${
                      order.status === 'paid' ? 'text-emerald-500' : 'text-amber-500'
                    }`}>{order.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-center items-center justify-center text-slate-400 text-sm italic py-10">No recent orders</div>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Inventory Alerts</h3>
            <Link to="/products" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Manage Stock</Link>
          </div>
          <div className="space-y-4 flex-1">
            {isLoading ? (
              [1, 2].map(i => <div key={i} className="h-24 bg-slate-50 animate-pulse rounded-xl"></div>)
            ) : data?.lowStockProducts?.length > 0 ? (
              data.lowStockProducts.map((product) => (
                <div key={product._id} className="flex items-center justify-between py-4 bg-red-50/50 px-4 rounded-xl border border-red-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg border border-red-100 shrink-0 overflow-hidden">
                      {product.imageUrl ? (
                        <img src={`${config.IMAGE_BASE_URL}${product.imageUrl}`} className="w-full h-full object-cover" alt={product.name} />
                      ) : (
                        <Watch className="text-red-200 w-full h-full p-2" strokeWidth={1} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 truncate max-w-37.5">{product.name || product.model}</p>
                      <p className="text-xs text-red-500 font-medium">Only {product.stock} items left</p>
                    </div>
                  </div>
                  <Link 
                    to={`/products/${product._id}/edit`}
                    className="text-xs font-bold bg-white text-slate-900 px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    Restock
                  </Link>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-center items-center justify-center text-slate-400 text-sm italic py-10">All items are well stocked</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
