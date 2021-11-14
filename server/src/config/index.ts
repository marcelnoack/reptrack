import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (process.env.NODE_ENV && envFound.error)
  throw new Error("Couldn't find .env file");

export default {
  port: parseInt(process.env.PORT || '80', 10),

  // API configuration
  api: {
    prefix: 'v1'
  }
};
