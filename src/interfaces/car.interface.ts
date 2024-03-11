import { z } from "zod";
import { carCreateSchema, carReturnSchema, carUpdateSchema } from "../schemas/cars.schema";

export type CarCreate = z.infer<typeof carCreateSchema>
export type CarUpdate = z.infer<typeof carUpdateSchema>
export type CarReturn = z.infer<typeof carReturnSchema>