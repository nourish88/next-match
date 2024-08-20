'use server';

import { prisma } from '@/lib/prisma';
import { customerSchema, CustomerSchema } from '@/lib/schemas/Customers/customerSchema';
import { ActionResult } from '@/types';
import { Customer } from '@prisma/client';
import { auth } from '@/auth';

export async function createCustomer(data: CustomerSchema): Promise<ActionResult<Customer>> {
  
    const session = await auth();
    try {
        const validated = customerSchema.safeParse(data);

        if (!validated.success) {
            return {status: 'error', error: validated.error.errors }
        }

        const { name, surName,phoneNumber} = validated.data;

        const createdAt= new Date();

        const existingCustomer= await prisma.customer.findFirst({
            where: { name, surName,phoneNumber }
        });

        if (existingCustomer) return {status: 'error', error: 'Customer already exists' };

        const user = await prisma.customer.create({
            data: {
                name,
                surName,
                phoneNumber,
                createdAt,
                userid:session?.user?.id??""
            }
        })

        return {status: 'success', data: user}
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'Something went wrong'}
    }

}
