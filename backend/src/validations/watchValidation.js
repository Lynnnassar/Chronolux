const joi = require("joi");

const objectId = joi.string().hex().length(24);

const specificationsSchema = joi.object({
  movement: joi.string().allow(""),
  caliber: joi.string().allow(""),
  powerReserve: joi.string().allow(""),
  caseMaterial: joi.string().allow(""),
  braceletMaterial: joi.string().allow(""),
  caseDiameter: joi.string().allow(""),
  caseThickness: joi.string().allow(""),
  crystal: joi.string().allow(""),
  dialColor: joi.string().allow(""),
  waterResistance: joi.string().allow(""),
  functions: joi.array().items(joi.string().allow("")),
});

const createWatch = {
  body: joi.object().keys({
    name: joi.string().required(),
    slug: joi.string().required(),
    sku: joi.string().required(),

    brand: objectId.required(),
    collectionRef: objectId.allow(null, ""),
    categories: joi
      .alternatives()
      .try(joi.array().items(objectId), objectId, joi.string().allow("")),

    price: joi.number().required().min(0),
    discountPrice: joi
      .alternatives()
      .try(joi.number().min(0), joi.string().allow("")),
    currency: joi.string().allow(""),

    stock: joi.number().required().min(0),
    lowStockThreshold: joi
      .alternatives()
      .try(joi.number().min(0), joi.string().allow("")),
    trackInventory: joi.boolean(),

    shortDescription: joi.string().allow(""),
    description: joi.string().allow(""),

    thumbnail: joi.string().allow(""),
    images: joi
      .alternatives()
      .try(joi.array().items(joi.string().allow("")), joi.string().allow("")),
    imageUrl: joi.string().allow(""),

    specifications: joi
      .alternatives()
      .try(specificationsSchema, joi.string().allow("")),

    condition: joi.string().valid("new", "pre-owned").allow(""),
    gender: joi.string().valid("men", "women", "unisex").allow(""),
    warranty: joi.string().allow(""),
    boxIncluded: joi.boolean(),
    papersIncluded: joi.boolean(),

    featured: joi.boolean(),
    status: joi
      .string()
      .valid("draft", "published", "archived", "out_of_stock"),

    seoTitle: joi.string().allow(""),
    seoDescription: joi.string().allow(""),
    metaKeywords: joi
      .alternatives()
      .try(joi.array().items(joi.string().allow("")), joi.string().allow("")),
  }),
};

const updateWatch = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  body: joi
    .object()
    .keys({
      name: joi.string(),
      slug: joi.string(),
      sku: joi.string(),

      brand: objectId,
      collectionRef: objectId.allow(null, ""),
      categories: joi
        .alternatives()
        .try(joi.array().items(objectId), objectId, joi.string().allow("")),

      price: joi.number().min(0),
      discountPrice: joi
        .alternatives()
        .try(joi.number().min(0), joi.string().allow("")),
      currency: joi.string().allow(""),

      stock: joi.number().min(0),
      lowStockThreshold: joi
        .alternatives()
        .try(joi.number().min(0), joi.string().allow("")),
      trackInventory: joi.boolean(),

      shortDescription: joi.string().allow(""),
      description: joi.string().allow(""),

      thumbnail: joi.string().allow(""),
      images: joi
        .alternatives()
        .try(joi.array().items(joi.string().allow("")), joi.string().allow("")),
      imageUrl: joi.string().allow(""),

      specifications: joi
        .alternatives()
        .try(specificationsSchema, joi.string().allow("")),

      condition: joi.string().valid("new", "pre-owned").allow(""),
      gender: joi.string().valid("men", "women", "unisex").allow(""),
      warranty: joi.string().allow(""),
      boxIncluded: joi.boolean(),
      papersIncluded: joi.boolean(),

      featured: joi.boolean(),
      status: joi
        .string()
        .valid("draft", "published", "archived", "out_of_stock"),

      seoTitle: joi.string().allow(""),
      seoDescription: joi.string().allow(""),
      metaKeywords: joi
        .alternatives()
        .try(joi.array().items(joi.string().allow("")), joi.string().allow("")),
    })
    .min(1),
};

const getWatch = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createWatch,
  updateWatch,
  getWatch,
};
