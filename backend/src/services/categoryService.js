const Category = require("../models/Category");

const listCategories = async () => {
  return Category.find().sort({ name: 1 });
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }
  return category;
};

const createCategory = async (data) => {
  const existing = await Category.findOne({
    $or: [{ name: data.name }, { slug: data.slug }],
  });
  if (existing) {
    const error = new Error("Category already exists");
    error.statusCode = 400;
    throw error;
  }
  return Category.create(data);
};

const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }
  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }
  return category;
};

module.exports = {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
