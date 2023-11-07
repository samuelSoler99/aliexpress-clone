import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    return prisma.addresses.create({
        data: {
            userId: body.userId,
            name: body.name,
            address: body.address,
            city: body.city,
            country: body.country,
            zipcode: body.zipcode
        }
    });
})