import { Trash2, Mail } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../config";

const CustomerList = () => {
  const queryClient = useQueryClient();
  const { data: customers, isLoading } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      const response = await axios.get(`${config.API_BASE_URL}/users`);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${config.API_BASE_URL}/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-customers"]);
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif font-bold text-slate-900">
          Customers
        </h2>
        <p className="text-slate-500 text-sm">
          View and manage registered users.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Customer
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Joined
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
                    <td colSpan="3" className="px-6 py-8 bg-slate-50/50"></td>
                  </tr>
                ))
              : customers?.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                          {(user.fullName || user.name || "").substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {user.fullName || user.name}
                          </p>
                          <p className="text-xs text-slate-400 flex items-center">
                            <Mail size={12} className="mr-1" /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm("Delete this customer?"))
                            deleteMutation.mutate(user._id);
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
