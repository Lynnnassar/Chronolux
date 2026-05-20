const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    description: {
      type: String,
      default: "",
    },
    heroImage: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["published", "archived", "draft"],
      default: "published",
    },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

// Collections are unique by name across the site
collectionSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Collection", collectionSchema);
