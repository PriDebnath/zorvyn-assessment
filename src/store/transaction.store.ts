
import { createStore, create, } from "zustand"
import { persist } from "zustand/middleware"
import { mockTransactions } from "@/feature/dashboard/mock-data";

export type Transaction = {
    id: number;
    date: Date;
    category: string;
    type: "expense" | "income";
    amount: number;
}

type Store = {
    transactions: Transaction[]
    createTransaction: (transaction: Transaction) => void;
    updateTransaction: (transaction: Transaction) => void;
    deleteTransaction: (transaction: Transaction) => void;
}

const store = create<Store>()

export const useTransactionStore = store(
    persist(
        (set) => ({
            transactions: mockTransactions,
            createTransaction: (transaction: Transaction) => {
                set((currentState) => {
                    const transactions = [...currentState.transactions]
                    return {
                        transactions: [ ...transactions,transaction,]
                    }
                })
            },
            updateTransaction: (transaction: Transaction) => {
                set((currentState) => {
                    const transactions = [...currentState.transactions]
                    const newTransactions = transactions.map((t)=>{
                        if (t.id == transaction.id){
                            return transaction
                        }
                        return t
                    })
                    return {
                        transactions: [ ...newTransactions]
                    }
                })
            },
            deleteTransaction: (transaction: Transaction) => {
                set((currentState) => {
                    const transactions = [...currentState.transactions]
                    const transactionsFilter = transactions?.filter((t) => t.id != transaction.id)
                    return {
                        transactions: [...transactionsFilter]
                    }
                })
            },
        }),
        {
            name: "transactions"
        })
)
