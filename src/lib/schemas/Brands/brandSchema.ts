import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(3),
});

export type BrandSchema = z.infer<typeof brandSchema>;
