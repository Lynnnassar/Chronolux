import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Upload, ChevronLeft } from "lucide-react";
import axios from "axios";
import config from "../config";
import { toast } from "sonner";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const emptyFormData = {
    name: "",
    slug: "",
    sku: "",
    price: "",
    stock: "",
    brand: "",
    collectionRef: "",
    description: "",
    shortDescription: "",
    currency: "",
    trackInventory: true,
    thumbnail: "",
    images: [],
    warranty: "",
    boxIncluded: true,
    papersIncluded: true,
    featured: false,
    status: "published",
    condition: "new",
    gender: "unisex",
    seoTitle: "",
    seoDescription: "",
    metaKeywords: [],
    specifications: {
      movement: "",
      caliber: "",
      powerReserve: "",
      caseMaterial: "",
      caseDiameter: "",
      waterResistance: "",
    },
    categories: [],
  };

  const [formData, setFormData] = useState(emptyFormData);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [brands, setBrands] = useState([]);

  // Fetch product data if editing
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${config.API_BASE_URL}/watches/${id}`)
        .then((res) => {
          const watch = res.data;
          setFormData({
            ...emptyFormData,
            ...watch,
            brand: watch.brand?._id || watch.brand || "",
            collectionRef:
              watch.collectionRef?._id || watch.collectionRef || "",
            categories: Array.isArray(watch.categories)
              ? watch.categories.map((category) => category?._id || category)
              : [],
            images: Array.isArray(watch.images) ? watch.images : [],
            metaKeywords: Array.isArray(watch.metaKeywords)
              ? watch.metaKeywords
              : [],
            specifications:
              watch.specifications || emptyFormData.specifications,
          });
          const previewImage = watch.thumbnail || watch.imageUrl || "";
          if (previewImage) {
            setImagePreview(`${config.IMAGE_BASE_URL}${previewImage}`);
          }
        })
        .catch((err) => console.error("Failed to fetch watch:", err));
    }
  }, [id, isEdit]);

  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/brands`)
      .then((res) => setBrands(res.data || []))
      .catch((err) => console.error("Failed to fetch brands:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    const allowedKeys = [
      "name",
      "slug",
      "sku",
      "price",
      "stock",
      "brand",
      "collectionRef",
      "description",
      "status",
      "condition",
      "gender",
      "specifications",
      "categories",
      "shortDescription",
      "currency",
      "trackInventory",
      "thumbnail",
      "images",
      "warranty",
      "boxIncluded",
      "papersIncluded",
      "featured",
      "seoTitle",
      "seoDescription",
      "metaKeywords",
    ];

    allowedKeys.forEach((key) => {
      const value = formData[key];
      if (value === undefined || value === "") return;
      if (typeof value === "object" && key !== "categories") {
        data.append(key, JSON.stringify(value));
      } else if (Array.isArray(value)) {
        data.append(key, value.join(","));
      } else {
        data.append(key, value);
      }
    });

    if (imageFile) {
      data.append("watchImage", imageFile);
    }

    try {
      if (isEdit) {
        await axios.put(`${config.API_BASE_URL}/watches/${id}`, data);
        toast.success("Timepiece updated successfully");
      } else {
        await axios.post(`${config.API_BASE_URL}/watches`, data);
        toast.success("New timepiece added to collection");
      }
      navigate("/products");
    } catch (error) {
      console.error("Failed to save watch:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              {isEdit ? "Edit Watch" : "Add New Watch"}
            </h2>
            <p className="text-slate-500 text-sm">
              Enter the technical details for this timepiece.
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 hover:bg-slate-800 transition-all shadow-lg"
          >
            <Save size={18} />
            <span className="text-sm font-bold">Save Watch</span>
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        {/* Left Column: General & Specs */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Information */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4">
              General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Rolex Submariner Date 126610LN"
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="rolex-submariner-date"
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="RLX-SUB-126610"
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Full watch description and history..."
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Movement
                </label>
                <input
                  type="text"
                  name="specifications.movement"
                  value={formData.specifications.movement}
                  onChange={handleInputChange}
                  placeholder="e.g. Automatic"
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Caliber
                </label>
                <input
                  type="text"
                  name="specifications.caliber"
                  value={formData.specifications.caliber}
                  onChange={handleInputChange}
                  placeholder="e.g. 3235"
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Power Reserve
                </label>
                <input
                  type="text"
                  name="specifications.powerReserve"
                  value={formData.specifications.powerReserve}
                  onChange={handleInputChange}
                  placeholder="e.g. 70 Hours"
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Case Diameter
                </label>
                <input
                  type="text"
                  name="specifications.caseDiameter"
                  value={formData.specifications.caseDiameter}
                  onChange={handleInputChange}
                  placeholder="e.g. 41mm"
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Media & Status */}
        <div className="space-y-8">
          {/* Image Upload */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4">
              Product Media
            </h3>
            <div className="relative group">
              <div className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 overflow-hidden relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Upload size={32} strokeWidth={1} className="mb-2" />
                    <p className="text-[10px] font-bold uppercase">
                      Click to upload image
                    </p>
                  </>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </section>

          {/* Pricing & Inventory */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4">
              Pricing & Stock
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Price (USD)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Organization */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4">
              Organization
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                >
                  <option value="new">New</option>
                  <option value="pre-owned">Pre-owned</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
