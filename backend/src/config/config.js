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
    EMAIL_HOST: joi.string().required().description("SMTP host for outgoing email"),
    EMAIL_PORT: joi.number().required().description("SMTP port for outgoing email"),
    EMAIL_SECURE: joi.string()
      .valid("true", "false")
      .default("false")
      .description("Use secure SMTP connection"),
    EMAIL_USER: joi.string().required().description("SMTP auth user"),
    EMAIL_PASS: joi.string().required().description("SMTP auth password"),
    EMAIL_FROM: joi.string().required().description("Sender email address"),
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
