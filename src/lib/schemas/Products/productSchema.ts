import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
<<<<<<< HEAD
  barcode: z.string().optional(),
=======
  barcode: z.string().optinal(),
>>>>>>> 710ce76c3b25dc3c983afb91834a032204803ad1
  groupId: z.number().max(1000).int().positive(),
});

export type ProductSchema = z.infer<typeof productSchema>;
