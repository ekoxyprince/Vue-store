import { Sequelize } from "sequelize";
import { ENV as env } from "./env.js";

export const database = new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
  dialect: "mysql",
  host: env.dbHost,
  port: env.dbPort,
});

export const connectDb = async () => await database.authenticate();
