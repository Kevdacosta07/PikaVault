import {prisma} from "@/lib/prisma";

export async function PayedOrder({ orderId }: { orderId: string }){
    await prisma.order.update({
        where: {id: orderId},
        data: {
            status: "paid"
        }
    })
}

export async function CancelOrder({ orderId }: { orderId: string }){
    await prisma.order.update({
        where: {id: orderId},
        data: {
            status: "cancelled"
        }
    })
}