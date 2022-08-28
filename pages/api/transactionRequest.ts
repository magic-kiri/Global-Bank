import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/apollo-client";
import {
  addTransaction,
  getBankInformation,
  incrementBalance,
} from "../../lib/hasura_query";
import {
  AccountInfo,
  TransactionRequest,
  TransactionResponse,
} from "../../lib/types";

const fetchBankInformation = async (idList: number[]) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify({
      query: getBankInformation(idList),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  return await response.json();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { sender, reciever, amount, secretKey }: TransactionRequest =
      req.body;
    const { data } = await fetchBankInformation([sender, reciever]);
    const { bank_account } = data;
    let accounts = {};
    bank_account.forEach(
      ({ accountNumber, balance, secretKey }: AccountInfo) => {
        // @ts-ignore
        accounts[accountNumber] = { balance, secretKey };
      }
    );
    console.log(accounts, sender, reciever);
    // @ts-ignore
    if (accounts[sender] && accounts[reciever]) {
      // @ts-ignore
      if (accounts[sender].secretKey === secretKey) {

        // @ts-ignore
        console.log(accounts[sender.toString()].balance, amount);
        // @ts-ignore
        if (accounts[sender].balance >= amount) {
          // Create a 8-digit random string
          const txnId: string = (Math.random() + 1).toString(36).substring(4);
          const res1 = await client.mutate({
            mutation: incrementBalance(sender, -amount),
          });
          const res2 = await client.mutate({
            mutation: incrementBalance(reciever, amount),
          });
          const res3 = await client.mutate({
            mutation: addTransaction({ amount, txnId, reciever, sender }),
          });
          const txn: TransactionResponse = {
            txnId,
            sender,
            reciever,
            amount,
            verdict: true,
            message: "Transaction Successful!",
          };
          return res.status(200).json(txn);
        }
        return res
          .status(200)
          .json({ verdict: false, message: "Insufficient Balance!" });
      } else {
        return res
          .status(200)
          .json({ verdict: false, message: "Invalid Secret" });
      }
    } else {
      return res
        .status(200)
        .json({ status: false, message: "Invalid Account!" });
    }
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ status: false, message: "invalid token" });
}
