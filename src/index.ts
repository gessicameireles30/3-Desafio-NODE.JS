import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./database/data-souce";
import AppError from "./api/middlewares/AppError";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    app.listen(3000);
    app.use(
      (
        error: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        if (error instanceof AppError) {
          return res.status(error.code).json({
            code: error.code,
            status: error.status,
            message: error.message,
          });
        }
        return res.status(500).json({
          code: 500,
          status: "Internal Server Error",
          message: "Ocorreu um erro inesperado.",
        });
      },
    );
    app.listen(3000, () => {
      console.log("Funcionou");
    });
  })
  .catch((error) => console.log(error));
