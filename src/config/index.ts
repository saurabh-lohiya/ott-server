import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  client_url: process.env.CLIENT_URL || '',
  env: process.env.NODE_ENV || 'development',
  bcrypt: {
    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  },
  port: Number(process.env.PORT) || 8080,
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,
  mongoUrl: process.env.MONGO_URL,
  dbName: process.env.DB_NAME,
};

export default config;
