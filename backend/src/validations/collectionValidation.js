const joi = require("joi");

const objectId = joi.string().hex().length(24);

const createCollection = {
  body: joi.object().keys({
    name: joi.string().required().trim(),
    slug: joi.string().required().trim(),
    description: joi.string().allow(""),
    heroImage: joi.string().allow(""),
    featured: joi.boolean(),
    status: joi.string().valid("published", "archived", "draft"),
    seoTitle: joi.string().allow(""),
    seoDescription: joi.string().allow(""),
  }),
};

const updateCollection = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  body: joi
    .object()
    .keys({
      name: joi.string().trim(),
      slug: joi.string().trim(),
      description: joi.string().allow(""),
      heroImage: joi.string().allow(""),
      featured: joi.boolean(),
      status: joi.string().valid("published", "archived", "draft"),
      seoTitle: joi.string().allow(""),
      seoDescription: joi.string().allow(""),
    })
    .min(1),
};

const getCollection = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createCollection,
  updateCollection,
  getCollection,
};
