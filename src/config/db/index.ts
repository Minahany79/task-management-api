import { DataSourceOptions, DataSource } from "typeorm";
import { sanitizedConfig } from "../../../config";
import { SeedRole } from "./seeders/roles";
import { UserRoles } from "../../shared/models/user-roles";

const connectOptions: DataSourceOptions = {
  type: "mysql",
  host: sanitizedConfig.DB_HOST,
  port: sanitizedConfig.DB_PORT,
  username: sanitizedConfig.DB_USERNAME,
  password: sanitizedConfig.DB_PASSWORD,
  database: sanitizedConfig.DB_INSTANCE,
  synchronize: false,
  entities: [sanitizedConfig.NODE_ENV === "prod" ? "dist/src/domains/**/*.entity.js" : "src/domains/**/*.entity.ts"],
  migrations: [
    sanitizedConfig.NODE_ENV === "prod" ? "dist/src/config/db/migrations/*.js" : "src/config/db/migrations/*.ts",
  ],
};

export const DB = new DataSource(connectOptions);

export const initDB = async () => {
  const db = !DB.isInitialized ? await DB.initialize() : DB;
  await SeedRole(UserRoles.User.name);

  return db;
};

export const dropDB = async () => {
  await DB.destroy();
};
