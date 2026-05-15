const asyncHandler = require("../middlewares/asyncHandler");
const watchService = require("../services/watchService");

const getWatches = asyncHandler(async (req, res) => {
  const watches = await watchService.listWatches(req.query);
  res.status(200).json(watches);
});

const getWatchById = asyncHandler(async (req, res) => {
  const watch = await watchService.getWatchById(req.params.id);
  res.status(200).json(watch);
});

const normalizeWatchPayload = (payload) => {
  const watchData = { ...payload };

  ["_id", "__v", "createdAt", "updatedAt"].forEach((key) => {
    delete watchData[key];
  });

  if (typeof watchData.specifications === "string") {
    try {
      watchData.specifications = JSON.parse(watchData.specifications);
    } catch (error) {
      delete watchData.specifications;
    }
  }

  if (typeof watchData.categories === "string") {
    const trimmed = watchData.categories.trim();
    watchData.categories = trimmed
      ? trimmed.split(",").map((value) => value.trim())
      : [];
  }

  if (typeof watchData.metaKeywords === "string") {
    const trimmed = watchData.metaKeywords.trim();
    watchData.metaKeywords = trimmed
      ? trimmed.split(",").map((value) => value.trim())
      : [];
  }

  if (typeof watchData.images === "string") {
    const trimmed = watchData.images.trim();
    watchData.images = trimmed
      ? trimmed.split(",").map((value) => value.trim())
      : [];
  }

  ["price", "discountPrice", "stock", "lowStockThreshold"].forEach((key) => {
    if (typeof watchData[key] === "string") {
      if (watchData[key] === "") {
        delete watchData[key];
        return;
      }
      watchData[key] = Number(watchData[key]);
    }
  });

  ["trackInventory", "boxIncluded", "papersIncluded", "featured"].forEach(
    (key) => {
      if (typeof watchData[key] === "string") {
        watchData[key] = watchData[key] === "true";
      }
    },
  );

  return watchData;
};

const createWatch = asyncHandler(async (req, res) => {
  const watchData = normalizeWatchPayload(req.body);
  if (req.file) {
    const mediaPath = `/media/watches/${req.file.filename}`;
    watchData.thumbnail = mediaPath;
    watchData.images = [mediaPath];
    watchData.imageUrl = mediaPath;
  }
  const watch = await watchService.createWatch(watchData);
  res.status(201).json(watch);
});

const updateWatch = asyncHandler(async (req, res) => {
  const watchData = normalizeWatchPayload(req.body);
  if (req.file) {
    const mediaPath = `/media/watches/${req.file.filename}`;
    watchData.thumbnail = mediaPath;
    watchData.images = [mediaPath];
    watchData.imageUrl = mediaPath;
  }
  const watch = await watchService.updateWatch(req.params.id, watchData);
  res.status(200).json(watch);
});

const deleteWatch = asyncHandler(async (req, res) => {
  const watch = await watchService.deleteWatch(req.params.id);
  res.status(200).json({ message: "Watch deleted" });
});

module.exports = {
  getWatches,
  getWatchById,
  createWatch,
  updateWatch,
  deleteWatch,
};
