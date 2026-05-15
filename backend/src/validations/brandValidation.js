const joi = require("joi");

const createBrand = {
  body: joi.object().keys({
    name: joi.string().required().trim(),
    slug: joi.string().required().trim(),
    description: joi.string().allow(""),
    logo: joi.string().allow(""),
    imageUrl: joi.string().allow(""),
    featuredImage: joi.string().allow(""),
    country: joi.string().allow(""),
    foundedYear: joi.number().min(0),
    featured: joi.boolean(),
    status: joi.string().valid("published", "archived", "draft"),
    seoTitle: joi.string().allow(""),
    seoDescription: joi.string().allow(""),
  }),
};

const updateBrand = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  body: joi
    .object()
    .keys({
      name: joi.string().trim(),
      slug: joi.string().trim(),
      description: joi.string().allow(""),
      logo: joi.string().allow(""),
      imageUrl: joi.string().allow(""),
      featuredImage: joi.string().allow(""),
      country: joi.string().allow(""),
      foundedYear: joi.number().min(0),
      featured: joi.boolean(),
      status: joi.string().valid("published", "archived", "draft"),
      seoTitle: joi.string().allow(""),
      seoDescription: joi.string().allow(""),
    })
    .min(1),
};

const getBrand = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createBrand,
  updateBrand,
  getBrand,
};
