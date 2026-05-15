const asyncHandler = require("../middlewares/asyncHandler");
const path = require("path");
const fs = require("fs");

const listMedia = asyncHandler(async (req, res) => {
  const mediaDir = path.join(__dirname, "../../media");
  const subdirs = ["watches", "brands", "categories", "hero", "misc"];
  let allFiles = [];

  subdirs.forEach(subdir => {
    const dirPath = path.join(mediaDir, subdir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        if (fs.lstatSync(path.join(dirPath, file)).isFile()) {
          allFiles.push({
            name: file,
            url: `/media/${subdir}/${file}`,
            folder: subdir,
            size: fs.statSync(path.join(dirPath, file)).size,
            createdAt: fs.statSync(path.join(dirPath, file)).birthtime
          });
        }
      });
    }
  });

  res.status(200).json(allFiles.sort((a, b) => b.createdAt - a.createdAt));
});

const deleteMedia = asyncHandler(async (req, res) => {
  const { url } = req.body;
  if (!url || !url.startsWith("/media/")) {
    return res.status(400).json({ message: "Invalid media URL" });
  }

  const filePath = path.join(__dirname, "../../", url);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "Media deleted" });
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

module.exports = {
  listMedia,
  deleteMedia,
};
