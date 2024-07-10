import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    console.log("Received request at /hdfcWebhook");

    // TODO: Add zod validation here
    // TODO: HDFC bank should ideally send us a secret so we know this is sent by them

    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount,
    };

    try {
        console.log("Fetching transaction from DB for token:", paymentInformation.token);
        const transaction = await db.onRampTransaction.findFirst({
            where: {
                token: paymentInformation.token,
            },
        });

        if (transaction && transaction.status === "Success") {
            console.log("Transaction has already been processed");
            return res.status(200).json({
                message: "Transaction has already been processed",
            });
        }

        console.log("Starting DB transaction");
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId),
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount),
                    },
                },
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success",
                },
            }),
        ]);

        console.log("Transaction captured successfully");
        return res.json({
            message: "Captured",
        });
    } catch (e) {
        console.error("Error while processing webhook:", e);
        return res.status(500).json({
            message: "Error while processing webhook",
        });
    }
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
