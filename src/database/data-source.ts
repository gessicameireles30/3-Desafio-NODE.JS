import "reflect-metadata";
import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: ["./src/database/entities/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});
