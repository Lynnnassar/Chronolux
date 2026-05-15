import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../config";

const BrandList = () => {
  const queryClient = useQueryClient();
  const { data: brands, isLoading } = useQuery({
    queryKey: ["admin-brands"],
    queryFn: async () => {
      const response = await axios.get(`${config.API_BASE_URL}/brands`);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${config.API_BASE_URL}/brands/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-brands"]);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Brands
          </h2>
          <p className="text-slate-500 text-sm">
            Manage luxury watch manufacturers.
          </p>
        </div>
        <Link
          to="/brands/new"
          className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-slate-800 transition-all shadow-lg"
        >
          <Plus size={18} />
          <span className="text-sm font-bold">Add Brand</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Brand
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
            {isLoading
              ? [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td
                      colSpan="3"
                      className="px-6 py-8 h-12 bg-slate-50/50"
                    ></td>
                  </tr>
                ))
              : brands?.map((brand) => (
                  <tr
                    key={brand._id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-200 p-2">
                          {brand.imageUrl ? (
                            <img
                              src={`${config.IMAGE_BASE_URL}${brand.imageUrl}`}
                              alt={brand.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {brand.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-slate-400">
                        {brand.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/brands/${brand._id}/edit`}
                          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => {
                            if (window.confirm("Delete this brand?"))
                              deleteMutation.mutate(brand._id);
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

export default BrandList;
