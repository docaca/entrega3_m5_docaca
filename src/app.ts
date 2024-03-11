import "express-async-errors";
import express, { Application, json } from "express";
import cors from "cors";
import helmet from "helmet";
import { carRouter } from "./routes/car.router";
import { handleError } from "./middlewares/handleErrors.middleware";

export const app: Application = express();

app.use(cors());
app.use(helmet());

app.use(json());

app.use("/api/cars", carRouter);

app.use(handleError);
