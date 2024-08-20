import { z } from 'zod';

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
export const customerSchema = z.object({
    name: z.string().min(3),
    surName: z.string().min(3),
    phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
    
})

export type CustomerSchema = z.infer<typeof customerSchema>

