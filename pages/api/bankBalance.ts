import type { NextApiRequest, NextApiResponse } from "next";
import { getBalance } from "../../lib/hasura_query";
import { BankInfo, BankInfoResponse } from "../../lib/types";

const fetchBankInformation = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify({
      query: getBalance(id),
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
    const { accountNumber, secretKey }: BankInfo = req.body;
    const { data } = await fetchBankInformation(accountNumber);
    const bank_account: BankInfoResponse[] = data.bank_account;
    if (bank_account.length) {
      if (secretKey === bank_account[0].secretKey)
        return res
          .status(200)
          .json({ status: true, balance: bank_account[0].balance });
      else
        return res
          .status(200)
          .json({ status: false, message: "ভুল পাসওয়ার্ড" });
    } else
      return res
        .status(200)
        .json({ status: false, message: "উক্ত একাউন্ট নেই" });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ status: false, message: "invalid token" });
}
