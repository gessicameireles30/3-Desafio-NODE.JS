import "reflect-metadata";
import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "FlexiLease_Autos",
  synchronize: true,
  logging: false,
  entities: ["./src/database/entities/*.ts"],
  migrations: [],
  subscribers: [],
});