import { Card } from "@repo/ui/card"

export enum Nature {
    Sent,
    Rec
}

interface Transaction {
    time: Date,
    amount: number,
}

interface P2PTransactionsProps {
    transactions: Transaction[],
    type: Nature
}

export const P2PTransactions = ({ transactions, type }: P2PTransactionsProps) => {
    if (!transactions.length) {
        return <Card title={type == Nature.Sent ? "Recent Sent Transactions" : "Recent Received Transactions"}>
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title={type == Nature.Sent ? "Recent Sent Transactions" : "Recent Received Transactions"}>
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                    {type == Nature.Sent ? "Sent INR" : "Received INR"}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                {type == Nature.Sent ? "-" : "+"} Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}