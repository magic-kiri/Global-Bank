import { gql } from "@apollo/client";
import { Transaction } from "./types";

export const getBankInformation = (idList: number[]) => {
  return `
    query MyQuery {
      bank_account(where: { accountNumber: { _in: [${idList.toString()}] } }) {
        accountNumber
        balance
        secretKey
      }
    }
  `;
};

export const incrementBalance = (accountNumber: number, balance: number) => {
  return gql`
    mutation MyMutation {
      update_bank_account(
        where: { accountNumber: { _eq: ${accountNumber} } }
        _inc: { balance: ${balance} }
      ) {
        returning {
          id
          balance
          accountNumber
          name
        }
      }
    }
  `;
};

export const addTransaction = ({
  txnId,
  sender,
  reciever,
  amount,
}: Transaction) => {
  return gql`
    mutation MyMutation {
      insert_transactions(
        objects: { amount: ${amount}, sender: ${sender}, reciever: ${reciever}, txnId: "${txnId}" }
      ) {
        returning {
          amount
          id
          reciever
          sender
          txnId
        }
      }
    }
  `;
};

export const getBalance = (id: number) => {
  return `
  query MyQuery {
    bank_account(where: {accountNumber: {_eq: ${id}}}) {
      accountNumber
      balance
      name
      secretKey
    }
  }
  `;
};
