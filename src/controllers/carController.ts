import { Request, Response } from "express";
import { carService } from "../services/carService";

export class CarController {
  private carService = new carService();

  public create = async (
    { body }: Request,
    res: Response
  ): Promise<Response> => {
    const car = await this.carService.create(body);
    return res.status(201).json(car);
  };

  public read = async (req: Request, res: Response): Promise<Response> => {
    const cars = await this.carService.read()
    return res.status(200).json(cars);
  };

  public retrieve = async (req: Request, res: Response): Promise<Response> => {
    const {foundResource} = res.locals
    const car = await this.carService.retrieve(foundResource)
    return res.status(200).json(car);
  };

  public partialUpdate = async (
    {body, params: {carId}}: Request,
    res: Response
  ): Promise<Response> => {
    const car = await this.carService.partialUpdate(carId, body)
    return res.status(200).json(car);
  };

  public delete = async ({params: {carId}}: Request, res: Response): Promise<Response> => {
    await this.carService.delete(carId)
    return res.status(204).json();
  };
}
