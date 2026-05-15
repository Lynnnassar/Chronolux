require("dotenv").config();
const joi = require("joi");

const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow("development", "production", "test")
      .default("development"),
    PORT: joi.number().default(4000),
    MONGO_URI: joi.string().required().description("MongoDB connection string"),
    JWT_SECRET: joi.string().required().description("JWT secret key"),
    JWT_EXPIRES_IN: joi.string().default("7d"),
  })
  .unknown()
  .required();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGO_URI,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
};
