// EC-BackEnd to Bank
export type TransactionRequest = {
  sender: number;
  secretKey: string;
  reciever: number;
  amount: number;
};

// Bank to EC-BackEnd
export type TransactionResponse = {
  txnId: string;
  verdict: boolean;
  message?: string;
  sender: number;
  reciever: number;
  amount: number;
};

export type AccountInfo = {
  id: number;
  balance: number;
  accountNumber: number;
  secretKey: string;
};

export type Transaction = {
  txnId: string;
  sender: number;
  reciever: number;
  amount: number;
};