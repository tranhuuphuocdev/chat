import { load } from 'ts-dotenv';
import { resolve } from 'path';

export default load(
  {
    APP_URL: {
      type: String,
      default: '',
    },
    LOG_LEVEL: {
      type: String,
      default: 'debug',
    },
    PORT: Number,
    CONTEXT_PATH: {
      type: String,
      default: '/',
    },
    MONGO_DB_URL: String,
    JWT_ACCESS_TOKEN_SECRET: String,
    JWT_REFRESH_TOKEN_SECRET: String,
    JWT_ACCESS_TOKEN_EXPIRE_TIME: String,
    JWT_REFRESH_TOKEN_EXPIRE_TIME: String,
  },
  { path: resolve(__dirname, '../../../.env') },
);
