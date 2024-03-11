import { Router } from "express";
import { CarController } from "../controllers/carController";
import { ensure } from "../middlewares/ensure.middleware";
import { carCreateSchema, carUpdateSchema } from "../schemas/cars.schema";

export const carRouter = Router();

const controller = new CarController()

carRouter.post("", ensure.validBody(carCreateSchema), controller.create);
carRouter.get("", controller.read);

carRouter.use("/:id ", ensure.paramsIdExists({
    error: "Car not found.",
    model: "cars",
    searchKey: "carId"
}))

carRouter.get("/:id", controller.retrieve);
carRouter.patch("/:id", ensure.validBody(carUpdateSchema), controller.partialUpdate);
carRouter.delete("/:id"), controller.delete;
