import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  groupId: z.number().max(1000).int().positive(),
});

export type ProductSchema = z.infer<typeof productSchema>;
