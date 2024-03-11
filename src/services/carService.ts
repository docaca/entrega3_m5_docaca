import { Cars } from "@prisma/client";
import { CarCreate, CarReturn, CarUpdate } from "../interfaces/car.interface";
import { carReturnSchema } from "../schemas/cars.schema";
import { prisma } from "../database";

export class carService {
  public create = async (payLoad: CarCreate): Promise<CarReturn> => {
    return carReturnSchema.parse(await prisma.cars.create({ data: payLoad }));
  };

  public read = async (): Promise<Array<CarReturn>> => {
    return carReturnSchema.array().parse(await prisma.cars.findMany());
  };

  public retrieve = async (foundResource: Cars): Promise<CarReturn> => {
    return carReturnSchema.parse(foundResource);
  };

  public partialUpdate = async (
    carId: string,
    payLoad: CarUpdate
  ): Promise<CarReturn> => {
    const car = await prisma.cars.update({data: payLoad, where: {id: Number(carId)}})


    return carReturnSchema.parse(car);
  };

  public delete = async (carId: string): Promise<void> => {
    await prisma.cars.delete({ where: { id: Number(carId) } });
  };
}
