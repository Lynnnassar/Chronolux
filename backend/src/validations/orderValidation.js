const joi = require("joi");

const placeOrder = {
  body: joi.object().keys({
    items: joi
      .array()
      .items(
        joi.object().keys({
          watchId: joi.string().hex().length(24).required(),
          quantity: joi.number().integer().min(1).required(),
        }),
      )
      .required()
      .min(1),
  }),
};

const updateStatus = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  body: joi.object().keys({
    status: joi
      .string()
      .valid("pending", "paid", "shipped", "completed", "cancelled")
      .required(),
  }),
};

const getOrder = {
  params: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  placeOrder,
  getOrder,
  updateStatus,
};
