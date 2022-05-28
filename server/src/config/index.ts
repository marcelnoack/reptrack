import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (process.env.NODE_ENV !== 'production' && envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT || '80', 10),
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '',
  dbConnectionString: process.env.DATABASE_URL,

  // API configuration
  api: {
    prefix: 'v1'
  }
};
