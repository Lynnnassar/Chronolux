import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, Tag, Layers } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../config";

const CategoryList = () => {
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const response = await axios.get(`${config.API_BASE_URL}/categories`);
      return response.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${config.API_BASE_URL}/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-categories']);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Categories</h2>
          <p className="text-slate-500 text-sm">Organize watches by type or style.</p>
        </div>
        <Link 
          to="/categories/new" 
          className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-slate-800 transition-all shadow-lg"
        >
          <Plus size={18} />
          <span className="text-sm font-bold">Add Category</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="2" className="px-6 py-8 h-12 bg-slate-50/50"></td>
                </tr>
              ))
            ) : categories?.map((cat) => (
              <tr key={cat._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                      <Tag size={20} />
                    </div>
                    <p className="text-sm font-bold text-slate-900">{cat.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Link to={`/categories/${cat._id}/edit`} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                      <Edit2 size={16} />
                    </Link>
                    <Link to={`/categories/${cat._id}/watches`} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" title="Manage watches">
                      <Layers size={16} />
                    </Link>
                    <button 
                      onClick={() => {
                        if (window.confirm("Delete this category?")) deleteMutation.mutate(cat._id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
