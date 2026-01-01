import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST || "127.0.0.1",
  dbPort: process.env.DB_PORT,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
  jwtSecret: process.env.JWT_SECRET,
};
