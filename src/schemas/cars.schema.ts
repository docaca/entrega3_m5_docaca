import { z } from "zod";

export const carSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    description: z.string(),
    brand: z.string().min(1),
    year: z.number(),
    km: z.number()
});

export const carCreateSchema = carSchema.omit({ id: true })
export const carUpdateSchema = carCreateSchema.partial()
export const carReturnSchema = carSchema