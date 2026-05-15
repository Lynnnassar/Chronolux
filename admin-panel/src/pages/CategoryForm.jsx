import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ChevronLeft } from "lucide-react";
import axios from "axios";
import config from "../config";
import { toast } from "sonner";

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const emptyFormData = {
    name: "",
    slug: "",
    description: "",
  };

  const [formData, setFormData] = useState(emptyFormData);

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${config.API_BASE_URL}/categories/${id}`)
        .then((res) => setFormData({ ...emptyFormData, ...res.data }))
        .catch((err) => console.error(err));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${config.API_BASE_URL}/categories/${id}`, formData);
        toast.success("Category updated successfully");
      } else {
        await axios.post(`${config.API_BASE_URL}/categories`, formData);
        toast.success("Category created successfully");
      }
      navigate("/categories");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            {isEdit ? "Edit Category" : "Add Category"}
          </h2>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
        >
          <Save size={18} />
          <span className="text-sm font-bold">Save Category</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Category Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Slug
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="4"
            className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
