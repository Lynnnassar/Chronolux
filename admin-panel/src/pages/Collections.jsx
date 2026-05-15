import { Plus, Edit2, Trash2, Layers } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";

const Collections = () => {
  const { data: collections, isLoading } = useQuery({
    queryKey: ["admin-collections"],
    queryFn: async () => {
      const response = await axios.get(`${config.API_BASE_URL}/collections`);
      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Collections
          </h2>
          <p className="text-slate-500 text-sm">
            Group products into seasonal or themed collections.
          </p>
        </div>
        <Link
          to="/collections/new"
          className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-slate-800 transition-all shadow-lg"
        >
          <Plus size={18} />
          <span className="text-sm font-bold">Add Collection</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Collection
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Slug
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              [1, 2].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="3" className="px-6 py-8 bg-slate-50/50"></td>
                </tr>
              ))
            ) : collections?.length > 0 ? (
              collections.map((col) => (
                <tr
                  key={col._id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {col.name}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">
                    {col.slug}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/collections/${col._id}/edit`}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-12 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Layers size={40} className="opacity-20" />
                    <p className="text-sm font-medium">
                      No collections created yet.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Collections;
