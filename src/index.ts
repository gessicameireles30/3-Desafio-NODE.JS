import * as express from "express";
import * as bodyParser from 'body-parser';
import { AppDataSource } from "../src/database/data-souce";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.listen(3000);
  })
  .catch((error) => console.log(error));