require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const mongoose = require("mongoose");
const config = require("./src/config/config");
require("./src/models/Brand");
const Watch = require("./src/models/Watch");

const mediaDir = path.join(__dirname, "media", "watches");

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const buildSvg = ({ brand, name }) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="1500" viewBox="0 0 1200 1500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d0b09"/>
      <stop offset="100%" stop-color="#2b1d12"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1500" rx="96" fill="url(#bg)"/>
  <circle cx="900" cy="300" r="260" fill="#c6a87d" opacity="0.18"/>
  <circle cx="240" cy="1200" r="320" fill="#7a5533" opacity="0.25"/>
  <rect x="140" y="220" width="920" height="1060" rx="64" fill="#f4efe8" opacity="0.12"/>
  <text x="140" y="240" fill="#e0d4c0" font-size="36" font-family="Cormorant Garamond, serif" letter-spacing="10">${brand.toUpperCase()}</text>
  <text x="140" y="350" fill="#ffffff" font-size="80" font-family="Cormorant Garamond, serif">${name}</text>
  <text x="140" y="420" fill="#e0d4c0" font-size="26" font-family="Manrope, sans-serif" letter-spacing="6">CHRONOLUX EDITION</text>
  <rect x="200" y="560" width="800" height="600" rx="80" fill="#ffffff" opacity="0.08"/>
  <circle cx="600" cy="860" r="230" stroke="#f1e7d8" stroke-width="6" opacity="0.5"/>
  <circle cx="600" cy="860" r="140" stroke="#f1e7d8" stroke-width="3" opacity="0.5"/>
  <line x1="600" y1="860" x2="600" y2="720" stroke="#f1e7d8" stroke-width="6" stroke-linecap="round"/>
  <line x1="600" y1="860" x2="700" y2="940" stroke="#f1e7d8" stroke-width="6" stroke-linecap="round"/>
</svg>`;
};

const generateForWatch = (watch) => {
  const brandName = watch.brand?.name || "ChronoLux";
  const slug = watch.slug || slugify(watch.name);
  const svgPath = path.join(mediaDir, `${slug}.svg`);
  const webpPath = path.join(mediaDir, `${slug}.webp`);

  fs.writeFileSync(svgPath, buildSvg({ brand: brandName, name: watch.name }));

  execFileSync("magick", [
    "-density",
    "160",
    svgPath,
    "-resize",
    "1200x1500",
    "-quality",
    "82",
    webpPath,
  ]);

  fs.unlinkSync(svgPath);

  return `/media/watches/${slug}.webp`;
};

const run = async () => {
  ensureDir(mediaDir);
  await mongoose.connect(config.mongoose.url);

  const watches = await Watch.find().populate("brand", "name");

  for (const watch of watches) {
    const imageUrl = generateForWatch(watch);
    watch.thumbnail = imageUrl;
    watch.imageUrl = imageUrl;
    watch.images = [imageUrl];
    await watch.save();
  }

  console.log(`Generated media for ${watches.length} watches.`);
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("Media generation failed:", error.message);
  process.exit(1);
});
