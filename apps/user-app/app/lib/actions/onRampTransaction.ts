"use server";

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const createOnRampTransaction = async (amount : number, provider: string ) => {
    const session = await getServerSession(authOptions);
    const userid = session.user.id
    const token = (Math.random()*1000).toString();
    if (!userid) {
        return {
            message : "You are not logged in"
        }
    }

    const transaction = await prisma.onRampTransaction.create({
        data: {
            userId: Number(userid),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token
        }
    })

    return {
        message: "Transaction Successfull",
        transaction
    }
}