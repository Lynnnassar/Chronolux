const joi = require("joi");

const createCategory = {
  body: joi.object().keys({
    name: joi.string().required().trim(),
    slug: joi.string().required().trim(),
    description: joi.string().allow(""),
    featured: joi.boolean(),
  }),
};

const updateCategory = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  body: joi
    .object()
    .keys({
      name: joi.string().trim(),
      slug: joi.string().trim(),
      description: joi.string().allow(""),
      featured: joi.boolean(),
    })
    .min(1),
};

const getCategory = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
};
