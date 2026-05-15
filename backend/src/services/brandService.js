const Brand = require("../models/Brand");

const listBrands = async () => {
  return await Brand.find().sort({ name: 1 });
};

const getBrandById = async (id) => {
  return await Brand.findById(id);
};

const createBrand = async (brandData) => {
  return await Brand.create(brandData);
};

const updateBrand = async (id, brandData) => {
  return await Brand.findByIdAndUpdate(id, brandData, { new: true });
};

const deleteBrand = async (id) => {
  return await Brand.findByIdAndDelete(id);
};

module.exports = {
  listBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
