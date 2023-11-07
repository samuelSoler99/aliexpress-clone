import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    return prisma.orders.findMany(
        {
            where: {userId: event.context.params.userId},
            orderBy: {id: "desc"},
            include: {
                orderItem: {
                    include: {
                        product: true
                    }
                }
            }
        }
    )
})