import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Upload, ChevronLeft } from "lucide-react";
import axios from "axios";
import config from "../config";
import { toast } from "sonner";

const BrandForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const emptyFormData = {
    name: "",
    slug: "",
    description: "",
  };

  const [formData, setFormData] = useState(emptyFormData);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${config.API_BASE_URL}/brands/${id}`)
        .then((res) => {
          setFormData({ ...emptyFormData, ...res.data });
          if (res.data.imageUrl) {
            setImagePreview(`${config.IMAGE_BASE_URL}${res.data.imageUrl}`);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (imageFile) data.append("brandImage", imageFile);

    try {
      if (isEdit) {
        await axios.put(`${config.API_BASE_URL}/brands/${id}`, data);
        toast.success("Brand updated successfully");
      } else {
        await axios.post(`${config.API_BASE_URL}/brands`, data);
        toast.success("Brand added successfully");
      }
      navigate("/brands");
    } catch (err) {
      console.log(err);
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
            {isEdit ? "Edit Brand" : "Add Brand"}
          </h2>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
        >
          <Save size={18} />
          <span className="text-sm font-bold">Save Brand</span>
        </button>
      </div>

      <form className="grid grid-cols-1 gap-8">
        <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Brand Name
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
                Logo
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Upload size={24} className="text-slate-300" />
                  )}
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
                />
              </div>
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

export default BrandForm;
