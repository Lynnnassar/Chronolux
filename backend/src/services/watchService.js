const mongoose = require("mongoose");
const Watch = require("../models/Watch");
const Category = require("../models/Category");
const Collection = require("../models/Collection");

const listWatches = async (filters) => {
  const query = {};

  if (filters.brand) {
    query.brand = filters.brand;
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
  }

  if (filters.category) {
    let categoryId = null;
    if (mongoose.Types.ObjectId.isValid(filters.category)) {
      categoryId = filters.category;
    } else {
      const category = await Category.findOne({ name: filters.category });
      categoryId = category ? category._id : null;
    }
    if (categoryId) {
      query.categories = categoryId;
    } else {
      query.categories = { $in: [] };
    }
  }

  if (filters.collection) {
    let collectionId = null;
    if (mongoose.Types.ObjectId.isValid(filters.collection)) {
      collectionId = filters.collection;
    } else {
      const collection = await Collection.findOne({ name: filters.collection });
      collectionId = collection ? collection._id : null;
    }
    if (collectionId) {
      query.collectionRef = collectionId;
    } else {
      query.collectionRef = { $in: [] };
    }
  }

  return Watch.find(query)
    .populate("categories", "name")
    .populate("collectionRef", "name")
    .populate("brand", "name");
};

const getWatchById = async (id) => {
  const watch = await Watch.findById(id)
    .populate("categories", "name")
    .populate("brand", "name");
  if (!watch) {
    const error = new Error("Watch not found");
    error.statusCode = 404;
    throw error;
  }
  return watch;
};

const createWatch = async (data) => {
  return Watch.create(data);
};

const updateWatch = async (id, data) => {
  const watch = await Watch.findByIdAndUpdate(id, data, { new: true });
  if (!watch) {
    const error = new Error("Watch not found");
    error.statusCode = 404;
    throw error;
  }
  return watch;
};

const deleteWatch = async (id) => {
  const watch = await Watch.findByIdAndDelete(id);
  if (!watch) {
    const error = new Error("Watch not found");
    error.statusCode = 404;
    throw error;
  }
  return watch;
};

module.exports = {
  listWatches,
  getWatchById,
  createWatch,
  updateWatch,
  deleteWatch,
};
