import { useEffect, useState } from "react";
import { TrendingUp, PieChart, Calendar } from "lucide-react";
import axios from "axios";
import config from "../config";

const defaultTrend = Array.from({ length: 30 }, (_, index) => ({
  label: index === 0 ? "Start" : index === 29 ? "Today" : "",
  date: "",
  revenue: 0,
}));

const COLORS = [
  "#0f766e",
  "#1d4ed8",
  "#9333ea",
  "#d97706",
  "#065f46",
  "#7c3aed",
  "#2563eb",
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);

const buildLinePoints = (data, width, height, padding) => {
  const maxRevenue = Math.max(...data.map((item) => item.revenue), 0) || 1;
  const xStep = (width - padding * 2) / Math.max(data.length - 1, 1);
  return data.map((item, index) => {
    const x = padding + xStep * index;
    const y = height - padding - (item.revenue / maxRevenue) * (height - padding * 2);
    return `${x},${y}`;
  });
};

const getCircleStrokeDash = (percentage, circumference) =>
  `${(percentage / 100) * circumference} ${circumference}`;

const Analytics = () => {
  const [trend, setTrend] = useState(defaultTrend);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/analytics/report`);
        setTrend(
          response.data.revenueTrend.map((item, index) => ({
            ...item,
            label:
              index === 0
                ? "Start"
                : index === response.data.revenueTrend.length - 1
                ? "Today"
                : "",
          })),
        );
        setBrands(response.data.brandSales.slice(0, 6));
      } catch (err) {
        console.error("Failed to load analytics report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const revenueSum = trend.reduce((sum, item) => sum + item.revenue, 0);
  const maxRevenue = Math.max(...trend.map((item) => item.revenue), 1);
  const linePoints = buildLinePoints(trend, 820, 320, 32);
  const chartPath = linePoints.join(" ");
  const circumference = 2 * Math.PI * 52;
  const totalBrandRevenue = brands.reduce((sum, item) => sum + item.revenue, 0) || 1;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Analytics</h2>
          <p className="text-slate-500 text-sm">Deep dive into your revenue performance and brand sales share.</p>
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
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Sales Revenue</p>
              <h3 className="text-3xl font-bold text-slate-900">{formatCurrency(revenueSum)}</h3>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <TrendingUp size={24} className="text-emerald-500" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Period</p>
                <p className="text-sm font-medium">Last 30 days</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-slate-50 p-6">
            <svg viewBox="0 0 860 360" className="w-full h-[360px]">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0f766e" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <g>
                {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
                  const y = 32 + (320 - 64) * fraction;
                  const value = Math.round(maxRevenue * (1 - fraction));
                  return (
                    <g key={fraction}>
                      <line x1="32" y1={y} x2="828" y2={y} stroke="#e2e8f0" strokeWidth="1" />
                      <text x="12" y={y + 4} fontSize="11" fill="#94a3b8">
                        {formatCurrency(value)}
                      </text>
                    </g>
                  );
                })}
              </g>
              <polyline
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                points={chartPath}
              />
              <polygon
                points={`${chartPath} 828,328 32,328`}
                fill="rgba(15,118,110,0.12)"
              />
              {trend.map((item, index) => {
                const [x, y] = chartPath.split(" ")[index].split(",");
                return (
                  <circle key={item.date} cx={x} cy={y} r="4" fill="#0f766e" stroke="#ffffff" strokeWidth="2" />
                );
              })}
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 text-sm text-slate-500">
            <div>
              <p className="uppercase tracking-[0.3em]">Top revenue</p>
              <p className="text-slate-900 font-semibold">{formatCurrency(maxRevenue)}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.3em]">Average</p>
              <p className="text-slate-900 font-semibold">{formatCurrency(Math.round(revenueSum / trend.length))}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.3em]">Days tracked</p>
              <p className="text-slate-900 font-semibold">{trend.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Sales by Brand</p>
              <h3 className="text-2xl font-bold text-slate-900">Brand mix</h3>
            </div>
            <PieChart size={24} className="text-slate-400" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="mx-auto">
              <svg viewBox="0 0 220 220" className="w-56 h-56">
                <g transform="translate(110,110) rotate(-90)">
                  {brands.reduce((acc, item, index) => {
                    const percentage = (item.revenue / totalBrandRevenue) * 100;
                    const dashArray = getCircleStrokeDash(percentage, circumference);
                    const dashOffset = circumference * (1 - acc.cumulativePct / 100);
                    acc.elements.push(
                      <circle
                        key={item.brand}
                        r="52"
                        cx="0"
                        cy="0"
                        fill="none"
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth="24"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                      />,
                    );
                    acc.cumulativePct += percentage;
                    return acc;
                  }, { cumulativePct: 0, elements: [] }).elements}
                </g>
              </svg>
            </div>
            <div className="space-y-3">
              {brands.map((brand, index) => (
                <div key={brand.brand} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="block w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{brand.brand}</p>
                      <p className="text-xs text-slate-400">{Math.round((brand.revenue / totalBrandRevenue) * 100)}% of revenue</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{formatCurrency(brand.revenue)}</p>
                </div>
              ))}
              {brands.length === 0 && (
                <p className="text-sm text-slate-400">No brand revenue data available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="text-center text-slate-500">Loading analytics data...</div>
      )}
    </div>
  );
};

export default Analytics;
