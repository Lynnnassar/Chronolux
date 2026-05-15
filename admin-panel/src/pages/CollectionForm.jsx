import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ChevronLeft } from "lucide-react";
import axios from "axios";
import config from "../config";
import { toast } from "sonner";

const CollectionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const emptyFormData = {
    name: "",
    slug: "",
    brand: "",
    description: "",
    status: "published",
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/brands`)
      .then((res) => setBrands(res.data || []))
      .catch((err) => console.error("Failed to fetch brands:", err));
  }, []);

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${config.API_BASE_URL}/collections/${id}`)
        .then((res) => {
          const collection = res.data;
          setFormData({
            ...emptyFormData,
            ...collection,
            brand: collection.brand?._id || collection.brand || "",
          });
        })
        .catch((err) => console.error("Failed to fetch collection:", err));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`${config.API_BASE_URL}/collections/${id}`, formData);
        toast.success("Collection updated successfully");
      } else {
        await axios.post(`${config.API_BASE_URL}/collections`, formData);
        toast.success("Collection created successfully");
      }
      navigate("/collections");
    } catch (err) {
      console.error("Failed to save collection:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            {isEdit ? "Edit Collection" : "Add Collection"}
          </h2>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
        >
          <Save size={18} />
          <span className="text-sm font-bold">Save Collection</span>
        </button>
      </div>

      <form className="grid grid-cols-1 gap-8">
        <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Collection Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Brand
              </label>
              <select
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none"
              >
                <option value="">Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
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
        </section>
      </form>
    </div>
  );
};

export default CollectionForm;
