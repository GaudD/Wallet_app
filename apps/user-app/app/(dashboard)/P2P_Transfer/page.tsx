import { getServerSession } from "next-auth";
import { SendMoney } from "../../../components/SendMoneyCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Nature, P2PTransactions } from "../../../components/p2pTransactions";

async function getP2PTransactionSent () {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session.user.id)
        }
    })

    return txns.map(t => ({
        amount: t.amount,
        time: t.timestamp
    }))
}

async function getP2PTransactionRecieved () {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session.user.id)
        }
    })

    return txns.map(t => ({
        amount: t.amount,
        time: t.timestamp
    }))
}

export default async function () {
    const transactionsSent = await getP2PTransactionSent();
    const transactionsRec = await getP2PTransactionRecieved();
    

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div className="pt-4">
                <SendMoney />
            </div>
            <div>
                <div className="pt-4">
                    <P2PTransactions transactions={transactionsSent} type={Nature.Sent} />
                </div>
                <div className="pt-4">
                    <P2PTransactions transactions={transactionsRec} type={Nature.Rec} />
                </div>
            </div>
        </div>
    </div>
}