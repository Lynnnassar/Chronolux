import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../config";
import { toast } from "sonner";

const ProductList = () => {
  const queryClient = useQueryClient();

  // Fetch products from API
  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const response = await axios.get(`${config.API_BASE_URL}/watches`);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${config.API_BASE_URL}/watches/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-products"]);
      toast.success("Timepiece removed from inventory");
    },
  });

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this timepiece? This action cannot be undone.",
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Products
          </h2>
          <p className="text-slate-500 text-sm">
            Manage your luxury watch inventory.
          </p>
        </div>
        <Link
          to="/products/new"
          className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-slate-800 transition-all shadow-lg"
        >
          <Plus size={18} />
          <span className="text-sm font-bold">Add Product</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Product
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Brand
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Price
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Inventory
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
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td
                    colSpan="6"
                    className="px-6 py-8 h-12 bg-slate-50/50"
                  ></td>
                </tr>
              ))
            ) : !isLoading && products?.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <ImageIcon
                      size={48}
                      strokeWidth={1}
                      className="opacity-20"
                    />
                    <p className="text-sm font-medium">
                      No products found. Add your first timepiece!
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products?.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-200">
                        {product.thumbnail || product.imageUrl ? (
                          <img
                            src={`${config.IMAGE_BASE_URL}${product.thumbnail || product.imageUrl}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {product.name || product.model}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-tight">
                          {product.sku || "NO-SKU"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                      {product.brand?.name ||
                        (typeof product.brand === "string"
                          ? product.brand
                          : "")}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    ${product.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-bold ${product.stock <= 2 ? "text-red-500" : "text-slate-600"}`}
                      >
                        {product.stock} in stock
                      </span>
                      {product.stock <= 2 && (
                        <span className="text-[10px] text-red-400 font-bold uppercase">
                          Low Stock
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        product.status === "published"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {product.status || "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/products/${product._id}/edit`}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                        title="Edit Product"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
