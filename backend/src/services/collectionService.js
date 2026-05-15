const Collection = require("../models/Collection");

const listCollections = async () => {
  return await Collection.find().sort({ name: 1 });
};

const getCollectionById = async (id) => {
  return await Collection.findById(id);
};

const createCollection = async (data) => {
  return await Collection.create(data);
};

const updateCollection = async (id, data) => {
  return await Collection.findByIdAndUpdate(id, data, { new: true });
};

const deleteCollection = async (id) => {
  return await Collection.findByIdAndDelete(id);
};

module.exports = {
  listCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
};
