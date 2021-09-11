import { TRANSACTION_UPDATE, TRANSACTION_RESET } from "../";

export const getTransactionsList = ({ createdAt, param }) => ({
  type: GET_TRANSACTIONS_LIST,
  payload: { createdAt, param },
});

export const transactionReset = () => {
  return {
    type: TRANSACTION_RESET,
  };
};
