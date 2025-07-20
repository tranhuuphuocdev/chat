import * as joi from 'joi';

const joiConfigObject: Record<string, any> = {
  PORT: joi.number().port().required(),
  CONTEXT_PATH: joi.string().required(),
  MONGO_DB_URL: joi.string().required(),
  LOG_LEVEL: joi
    .string()
    .valid('debug', 'info', 'warn', 'error')
    .default('debug'),
  APP_URL: joi.string().required(),
  JWT_ACCESS_TOKEN_SECRET: joi.string(),
  JWT_REFRESH_TOKEN_SECRET: joi.string(),
  JWT_ACCESS_TOKEN_EXPIRE_TIME: joi.string(),
  JWT_REFRESH_TOKEN_EXPIRE_TIME: joi.string(),
};
export const validateSchemaConfig: Record<string, any> =
  joi.object(joiConfigObject);

export const configObject = {
  PORT: 'PORT',
  CONTEXT_PATH: 'CONTEXT_PATH',
  MONGO_DB_URL: 'MONGO_DB_URL',
  LOG_LEVEL: 'LOG_LEVEL',
  APP_URL: 'APP_URL',
  JWT_ACCESS_TOKEN_SECRET: 'JWT_ACCESS_TOKEN_SECRET',
  JWT_REFRESH_TOKEN_SECRET: 'JWT_REFRESH_TOKEN_SECRET',
  JWT_ACCESS_TOKEN_EXPIRE_TIME: 'JWT_ACCESS_TOKEN_EXPIRE_TIME',
  JWT_REFRESH_TOKEN_EXPIRE_TIME: 'JWT_REFRESH_TOKEN_EXPIRE_TIME',
};
