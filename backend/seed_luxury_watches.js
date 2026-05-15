require("dotenv").config();
const mongoose = require("mongoose");
const Brand = require("./src/models/Brand");
const Category = require("./src/models/Category");
const Collection = require("./src/models/Collection");
const Watch = require("./src/models/Watch");
const config = require("./src/config/config");

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const brands = [
  {
    name: "Rolex",
    country: "Switzerland",
    foundedYear: 1905,
    description:
      "Iconic Swiss luxury watches known for precision and prestige.",
    featured: true,
  },
  {
    name: "Omega",
    country: "Switzerland",
    foundedYear: 1848,
    description: "Legendary Swiss watchmaker with space and diving heritage.",
    featured: true,
  },
  {
    name: "Patek Philippe",
    country: "Switzerland",
    foundedYear: 1839,
    description: "Haute horlogerie with timeless craftsmanship and rarity.",
    featured: true,
  },
  {
    name: "Audemars Piguet",
    country: "Switzerland",
    foundedYear: 1875,
    description: "Avant-garde watchmaking with bold luxury sports designs.",
    featured: true,
  },
  {
    name: "Cartier",
    country: "France",
    foundedYear: 1847,
    description: "Parisian maison blending jewelry elegance with watchmaking.",
    featured: false,
  },
  {
    name: "Jaeger-LeCoultre",
    country: "Switzerland",
    foundedYear: 1833,
    description: "The watchmaker's watchmaker with refined complications.",
    featured: false,
  },
];

const categories = [
  "Diving Watches",
  "Dress Watches",
  "Chronograph",
  "Skeleton",
  "Automatic",
  "Limited Edition",
  "GMT",
  "Moonphase",
  "Heritage",
];

const collections = [
  { name: "Submariner", brand: "Rolex" },
  { name: "Daytona", brand: "Rolex" },
  { name: "Seamaster", brand: "Omega" },
  { name: "Speedmaster", brand: "Omega" },
  { name: "Nautilus", brand: "Patek Philippe" },
  { name: "Royal Oak", brand: "Audemars Piguet" },
  { name: "Tank", brand: "Cartier" },
  { name: "Reverso", brand: "Jaeger-LeCoultre" },
];

const watches = [
  {
    name: "Rolex Submariner Date 126610LN",
    sku: "RLX-SUB-126610LN",
    brand: "Rolex",
    collection: "Submariner",
    categories: ["Diving Watches", "Automatic"],
    price: 12950,
    stock: 6,
    specifications: {
      movement: "Automatic",
      caliber: "3235",
      caseMaterial: "Oystersteel",
      braceletMaterial: "Oystersteel",
      caseDiameter: "41mm",
      waterResistance: "300m",
    },
  },
  {
    name: "Rolex Daytona 116500LN",
    sku: "RLX-DAY-116500LN",
    brand: "Rolex",
    collection: "Daytona",
    categories: ["Chronograph", "Automatic"],
    price: 14650,
    stock: 4,
    specifications: {
      movement: "Automatic",
      caliber: "4130",
      caseMaterial: "Oystersteel",
      braceletMaterial: "Oystersteel",
      caseDiameter: "40mm",
    },
  },
  {
    name: "Omega Seamaster Diver 300M",
    sku: "OMG-SM-300M",
    brand: "Omega",
    collection: "Seamaster",
    categories: ["Diving Watches", "Automatic"],
    price: 5900,
    stock: 10,
    specifications: {
      movement: "Automatic",
      caliber: "8800",
      caseMaterial: "Stainless Steel",
      caseDiameter: "42mm",
      waterResistance: "300m",
    },
  },
  {
    name: "Omega Speedmaster Moonwatch",
    sku: "OMG-SPD-MOON",
    brand: "Omega",
    collection: "Speedmaster",
    categories: ["Chronograph", "Heritage"],
    price: 7600,
    stock: 8,
    specifications: {
      movement: "Manual",
      caliber: "3861",
      caseMaterial: "Stainless Steel",
      caseDiameter: "42mm",
    },
  },
  {
    name: "Patek Philippe Nautilus 5711/1A",
    sku: "PP-NAU-5711A",
    brand: "Patek Philippe",
    collection: "Nautilus",
    categories: ["Dress Watches", "Limited Edition"],
    price: 34000,
    stock: 1,
    specifications: {
      movement: "Automatic",
      caliber: "324 S C",
      caseMaterial: "Stainless Steel",
      caseDiameter: "40mm",
    },
  },
  {
    name: "Audemars Piguet Royal Oak 15500ST",
    sku: "AP-RO-15500ST",
    brand: "Audemars Piguet",
    collection: "Royal Oak",
    categories: ["Dress Watches", "Automatic"],
    price: 33500,
    stock: 2,
    specifications: {
      movement: "Automatic",
      caliber: "4302",
      caseMaterial: "Stainless Steel",
      caseDiameter: "41mm",
    },
  },
  {
    name: "Cartier Tank Must Large",
    sku: "CRT-TNK-MUST-L",
    brand: "Cartier",
    collection: "Tank",
    categories: ["Dress Watches"],
    price: 3200,
    stock: 12,
    specifications: {
      movement: "Quartz",
      caseMaterial: "Stainless Steel",
      caseDiameter: "33.7mm",
    },
  },
  {
    name: "Jaeger-LeCoultre Reverso Classic Large",
    sku: "JLC-REV-CL-L",
    brand: "Jaeger-LeCoultre",
    collection: "Reverso",
    categories: ["Dress Watches", "Heritage"],
    price: 8800,
    stock: 5,
    specifications: {
      movement: "Manual",
      caseMaterial: "Stainless Steel",
      caseDiameter: "45.6mm",
    },
  },
  {
    name: "Rolex GMT-Master II 126710BLRO",
    sku: "RLX-GMT-126710BLRO",
    brand: "Rolex",
    collection: "Submariner",
    categories: ["GMT", "Automatic"],
    price: 10900,
    stock: 3,
    specifications: {
      movement: "Automatic",
      caliber: "3285",
      caseMaterial: "Oystersteel",
      caseDiameter: "40mm",
    },
  },
  {
    name: "Omega Seamaster Aqua Terra",
    sku: "OMG-AT-150M",
    brand: "Omega",
    collection: "Seamaster",
    categories: ["Dress Watches", "Automatic"],
    price: 6200,
    stock: 7,
    specifications: {
      movement: "Automatic",
      caliber: "8900",
      caseMaterial: "Stainless Steel",
      caseDiameter: "41mm",
      waterResistance: "150m",
    },
  },
  {
    name: "Patek Philippe Nautilus Moonphase 5712/1A",
    sku: "PP-NAU-5712A",
    brand: "Patek Philippe",
    collection: "Nautilus",
    categories: ["Moonphase", "Limited Edition"],
    price: 50000,
    stock: 1,
    specifications: {
      movement: "Automatic",
      caliber: "240 PS IRM C LU",
      caseMaterial: "Stainless Steel",
      caseDiameter: "40mm",
    },
  },
];

const connect = async () => {
  await mongoose.connect(config.mongoose.url);
};

const upsertBySlug = async (Model, data) => {
  const slug = data.slug || slugify(data.name);
  const payload = { ...data, slug };
  return Model.findOneAndUpdate({ slug }, payload, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
};

const seed = async () => {
  await connect();

  const brandMap = new Map();
  for (const brand of brands) {
    const created = await upsertBySlug(Brand, brand);
    brandMap.set(created.name, created);
  }

  const categoryMap = new Map();
  for (const name of categories) {
    const created = await upsertBySlug(Category, { name });
    categoryMap.set(created.name, created);
  }

  const collectionMap = new Map();
  for (const collection of collections) {
    const brand = brandMap.get(collection.brand);
    if (!brand) {
      throw new Error(`Missing brand for collection: ${collection.name}`);
    }
    const created = await upsertBySlug(Collection, {
      name: collection.name,
      brand: brand._id,
      description: `${collection.name} collection by ${brand.name}.`,
    });
    collectionMap.set(created.name, created);
  }

  for (const watch of watches) {
    const brand = brandMap.get(watch.brand);
    const collection = collectionMap.get(watch.collection);
    const categoryIds = watch.categories
      .map((name) => categoryMap.get(name))
      .filter(Boolean)
      .map((category) => category._id);

    if (!brand) {
      throw new Error(`Missing brand for watch: ${watch.name}`);
    }

    await Watch.findOneAndUpdate(
      { slug: slugify(watch.name) },
      {
        name: watch.name,
        slug: slugify(watch.name),
        sku: watch.sku,
        brand: brand._id,
        collectionRef: collection ? collection._id : undefined,
        categories: categoryIds,
        price: watch.price,
        discountPrice: watch.discountPrice,
        currency: "USD",
        stock: watch.stock,
        shortDescription: watch.shortDescription || "",
        description: watch.description || "",
        specifications: watch.specifications || {},
        featured: Boolean(watch.featured),
        status: "published",
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );
  }

  const summary = {
    brands: await Brand.countDocuments(),
    categories: await Category.countDocuments(),
    collections: await Collection.countDocuments(),
    watches: await Watch.countDocuments(),
  };

  console.log("Seed complete:", summary);
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
