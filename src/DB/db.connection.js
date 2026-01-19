import { Sequelize } from "sequelize";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../../config/config.service.js";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
});

export const DBauthoticate = async () => {
  try {
    await sequelize.authenticate();
    console.log({ connection: "DataBase Connected" });
  } catch (error) {
    console.log({ connection: "DataBase Connection Failed" });
  }
};

export const DBsync = async () => {
  try {
    await sequelize.sync();
    console.log({ sync: "DataBase Synced" });
  } catch (error) {
    console.log({ sync: "DataBase Synced Failed" });
  }
};
