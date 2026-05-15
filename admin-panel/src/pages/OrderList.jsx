import { Eye, X } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../config";

const OrderList = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminToken");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await axios.get(`${config.API_BASE_URL}/orders`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return response.data;
    },
  });

  const { data: selectedOrder, isLoading: isOrderLoading } = useQuery({
    queryKey: ["admin-order", selectedOrderId],
    enabled: Boolean(token && selectedOrderId),
    queryFn: async () => {
      const response = await axios.get(
        `${config.API_BASE_URL}/orders/${selectedOrderId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
      );
      return response.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axios.put(
        `${config.API_BASE_URL}/orders/${id}/status`,
        { status },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-orders"]);
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif font-bold text-slate-900">Orders</h2>
        <p className="text-slate-500 text-sm">
          Monitor and fulfill customer orders.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Order ID
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Customer
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Total
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading
              ? [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="px-6 py-8 bg-slate-50/50"></td>
                  </tr>
                ))
              : orders?.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-xs font-mono font-bold text-slate-400">
                      #{order._id.substring(18).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">
                        {order.customer?.fullName || "Guest"}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                      ${order.totalPrice?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatusMutation.mutate({
                            id: order._id,
                            status: e.target.value,
                          })
                        }
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border-none outline-none cursor-pointer ${
                          order.status === "paid"
                            ? "bg-emerald-50 text-emerald-600"
                            : order.status === "shipped"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrderId(order._id)}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {selectedOrderId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedOrderId(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900"
            >
              <X size={18} />
            </button>
            <h3 className="text-xl font-serif text-slate-900">Order details</h3>
            {isOrderLoading || !selectedOrder ? (
              <p className="text-sm text-slate-500 mt-4">Loading order...</p>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="grid gap-2 text-sm text-slate-600">
                  <p>
                    <span className="text-slate-400">Order ID:</span> #
                    {selectedOrder._id.substring(18).toUpperCase()}
                  </p>
                  <p>
                    <span className="text-slate-400">Customer:</span>{" "}
                    {selectedOrder.customer?.fullName || "Guest"}
                  </p>
                  <p>
                    <span className="text-slate-400">Email:</span>{" "}
                    {selectedOrder.customer?.email || "-"}
                  </p>
                  <p>
                    <span className="text-slate-400">Status:</span>{" "}
                    {selectedOrder.status}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Items
                  </p>
                  <div className="mt-3 space-y-3">
                    {selectedOrder.items?.map((item) => (
                      <div
                        key={item.watch?._id || item._id}
                        className="flex justify-between text-sm"
                      >
                        <div>
                          <p className="text-slate-900 font-medium">
                            {item.watch?.name || "Watch"}
                          </p>
                          <p className="text-xs text-slate-400">
                            SKU: {item.watch?.sku || "-"}
                          </p>
                        </div>
                        <div className="text-right text-slate-600">
                          <p>Qty: {item.quantity}</p>
                          <p>${item.priceAtPurchase?.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between text-sm font-semibold text-slate-900">
                  <span>Total</span>
                  <span>${selectedOrder.totalPrice?.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
