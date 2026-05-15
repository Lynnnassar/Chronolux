const Watch = require("../models/Watch");
const Category = require("../models/Category");

const getHomePageData = async () => {
  // Fetch featured watches (e.g., top 4 by latest)
  const featuredWatches = await Watch.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("categories", "name");

  // Fetch some categories for the collections section
  const collections = await Category.find().limit(3);

  // Hardcoded hero and banners for now (could be moved to a Page model later)
  const heroSection = {
    title: "ChronoLux",
    subtitle: "Define Your Time",
    description: "Experience the pinnacle of Swiss engineering and luxury design.",
    ctaText: "Explore Collection",
    imageUrl: "/media/hero/hero-watch-main.jpg",
  };

  const banners = [
    {
      id: 1,
      title: "New Arrivals",
      subtitle: "Vintage Excellence",
      imageUrl: "/media/hero/banner-1.jpg",
    },
    {
      id: 2,
      title: "Sport Series",
      subtitle: "Precision Engineering",
      imageUrl: "/media/hero/banner-2.jpg",
    },
  ];

  return {
    heroSection,
    featuredWatches,
    collections,
    banners,
  };
};

module.exports = {
  getHomePageData,
};
