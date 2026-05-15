const asyncHandler = require("../middlewares/asyncHandler");
const collectionService = require("../services/collectionService");

const getCollections = asyncHandler(async (req, res) => {
  const collections = await collectionService.listCollections();
  res.status(200).json(collections);
});

const getCollectionById = asyncHandler(async (req, res) => {
  const collection = await collectionService.getCollectionById(req.params.id);
  res.status(200).json(collection);
});

const createCollection = asyncHandler(async (req, res) => {
  const collection = await collectionService.createCollection(req.body);
  res.status(201).json(collection);
});

const updateCollection = asyncHandler(async (req, res) => {
  const collection = await collectionService.updateCollection(req.params.id, req.body);
  res.status(200).json(collection);
});

const deleteCollection = asyncHandler(async (req, res) => {
  await collectionService.deleteCollection(req.params.id);
  res.status(200).json({ message: "Collection deleted" });
});

module.exports = {
  getCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
};
