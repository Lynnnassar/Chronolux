const asyncHandler = require("../middlewares/asyncHandler");
const brandService = require("../services/brandService");

const getBrands = asyncHandler(async (req, res) => {
  const brands = await brandService.listBrands();
  res.status(200).json(brands);
});

const getBrandById = asyncHandler(async (req, res) => {
  const brand = await brandService.getBrandById(req.params.id);
  res.status(200).json(brand);
});

const createBrand = asyncHandler(async (req, res) => {
  const brandData = { ...req.body };
  if (req.file) {
    brandData.imageUrl = `/media/brands/${req.file.filename}`;
  }
  const brand = await brandService.createBrand(brandData);
  res.status(201).json(brand);
});

const updateBrand = asyncHandler(async (req, res) => {
  const brandData = { ...req.body };
  if (req.file) {
    brandData.imageUrl = `/media/brands/${req.file.filename}`;
  }
  const brand = await brandService.updateBrand(req.params.id, brandData);
  res.status(200).json(brand);
});

const deleteBrand = asyncHandler(async (req, res) => {
  await brandService.deleteBrand(req.params.id);
  res.status(200).json({ message: "Brand deleted" });
});

module.exports = {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
