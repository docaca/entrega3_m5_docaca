import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { AppError } from "../errors/AppError";
import { prisma } from "../database";
import { DynamicParamsIdFinder, PrismaClientGeneric } from "../interfaces/utils";

class EnsureMiddleware {
  public validBody =
    (schema: AnyZodObject) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };

    public paramsIdExists =
    ({ error, model, searchKey }: DynamicParamsIdFinder) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const id = Number(req.params[searchKey]);
      const client = prisma[model] as PrismaClientGeneric;

      const foundResource = await client.findFirst({ where: { id } });

      if (!foundResource) {
        throw new AppError(error, 404);
      }

      res.locals = { ...res.locals, foundResource };

      return next();
    };
}

export const ensure = new EnsureMiddleware();
