import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useQueryClient } from "@tanstack/react-query";

const CategoryWatches = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [watches, setWatches] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [catRes, watchesRes] = await Promise.all([
        axios.get(`${config.API_BASE_URL}/categories/${id}`),
        axios.get(`${config.API_BASE_URL}/watches`),
      ]);
      setCategory(catRes.data);
      setWatches(watchesRes.data || []);
      const initial = new Set();
      (watchesRes.data || []).forEach((w) => {
        const cats = Array.isArray(w.categories)
          ? w.categories.map((c) => (c?._id ? c._id : c))
          : [];
        if (cats.map(String).includes(String(id))) initial.add(String(w._id));
      });
      setSelected(initial);
      setLoading(false);
    };
    load().catch((e) => console.error(e));
  }, [id]);

  const toggle = (watchId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(String(watchId))) next.delete(String(watchId));
      else next.add(String(watchId));
      return next;
    });
  };

  const handleSave = async () => {
    const changed = [];
    for (const w of watches) {
      const has = selected.has(String(w._id));
      const cats = Array.isArray(w.categories)
        ? w.categories.map((c) => (c?._id ? String(c._id) : String(c)))
        : [];
      const currentlyHas = cats.includes(String(id));
      if (has && !currentlyHas) {
        // add
        const next = [...new Set([...cats, String(id)])];
        changed.push({ id: w._id, data: { categories: next } });
      } else if (!has && currentlyHas) {
        // remove
        const next = cats.filter((c) => String(c) !== String(id));
        changed.push({ id: w._id, data: { categories: next } });
      }
    }

    if (changed.length === 0) return;
    try {
      await Promise.all(
        changed.map((c) => axios.put(`${config.API_BASE_URL}/watches/${c.id}`, c.data)),
      );
      // refresh listings
      queryClient.invalidateQueries(["admin-products"]);
      queryClient.invalidateQueries(["watches"]);
      alert("Category assignments updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update some watches");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Manage watches for category</h2>
          <p className="text-slate-500 text-sm">Assign existing watches to this category without recreating them.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/categories"
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
          >
            Back
          </Link>
          <button
            onClick={handleSave}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg"
          >
            Save
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-900">{category?.name}</h3>
          <p className="text-sm text-slate-500 mt-2">{category?.description}</p>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-16 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : watches.length === 0 ? (
            <div className="text-center text-slate-500 py-12">No watches available.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Assigned</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Watch</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-400">SKU</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Brand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {watches.map((w) => (
                    <tr key={w._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                          checked={selected.has(String(w._id))}
                          onChange={() => toggle(w._id)}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-slate-900">{w.name}</span>
                      </td>
                      <td className="px-4 py-4 text-slate-500 text-sm">{w.sku || w._id}</td>
                      <td className="px-4 py-4 text-slate-500 text-sm">
                        {w.brand?.name || (typeof w.brand === "string" ? w.brand : "—")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryWatches;
