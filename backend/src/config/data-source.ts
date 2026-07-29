import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { MenuItem } from "../entities/MenuItem";
import { ChangeRequest } from "../entities/ChangeRequest";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "1433"),
  username: process.env.DB_USERNAME || "sa",
  password: process.env.DB_PASSWORD || "Sapphire123!",
  database: process.env.DB_DATABASE || "master",
  synchronize: false,
  logging: false,
  entities: [User, MenuItem, ChangeRequest],
  migrations: [__dirname + "/../migrations/**/*.{js,ts}"],
  subscribers: [],
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
});
