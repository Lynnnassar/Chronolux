const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    sku: { type: String, required: true, unique: true },
    
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    collectionRef: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    currency: { type: String, default: "USD" },

    stock: { type: Number, required: true, min: 0 },
    lowStockThreshold: { type: Number, default: 2 },
    trackInventory: { type: Boolean, default: true },

    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },

    thumbnail: { type: String, default: "" },
    images: [{ type: String }],

    specifications: {
      movement: { type: String },
      caliber: { type: String },
      powerReserve: { type: String },
      caseMaterial: { type: String },
      braceletMaterial: { type: String },
      caseDiameter: { type: String },
      caseThickness: { type: String },
      crystal: { type: String },
      dialColor: { type: String },
      waterResistance: { type: String },
      functions: [{ type: String }]
    },

    condition: { type: String, enum: ["new", "pre-owned"], default: "new" },
    gender: { type: String, enum: ["men", "women", "unisex"], default: "unisex" },
    warranty: { type: String },
    boxIncluded: { type: Boolean, default: true },
    papersIncluded: { type: Boolean, default: true },

    featured: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ["draft", "published", "archived", "out_of_stock"], 
      default: "published" 
    },

    seoTitle: { type: String },
    seoDescription: { type: String },
    metaKeywords: [{ type: String }],
  },
  { timestamps: true }
);

watchSchema.index({ brand: 1, collectionRef: 1 });
watchSchema.index({ price: 1 });

module.exports = mongoose.model("Watch", watchSchema);
