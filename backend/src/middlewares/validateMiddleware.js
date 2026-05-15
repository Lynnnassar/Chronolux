const joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const validKeys = ["params", "query", "body"];
  const object = {};

  validKeys.forEach((key) => {
    if (schema[key]) {
      object[key] = req[key];
    }
  });

  const { value, error } = joi
    .compile(schema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    const err = new Error(errorMessage);
    err.statusCode = 400;
    return next(err);
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
