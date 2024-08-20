'use server';

import { prisma } from '@/lib/prisma';
import { ActionResult } from '@/types';
import { auth } from '@/auth';
import { brandSchema, BrandSchema } from '@/lib/schemas/Brands/brandSchema';
import { Group } from '@prisma/client';

export async function createBrand(data: BrandSchema): Promise<ActionResult<Group>> {
  
    const session = await auth();
    try {
        const validated = brandSchema.safeParse(data);

        if (!validated.success) {
            return {status: 'error', error: validated.error.errors }
        }

        const { name} = validated.data;

        const createdAt= new Date();

        const existingGroup= await prisma.group.findFirst({
            where: { name }
        });

        if (existingGroup) return {status: 'error', error: 'Brand already exists' };

        const user = await prisma.group.create({
            data: {
                name,
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
