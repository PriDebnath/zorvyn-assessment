import React, { useMemo } from "react";
import SummaryCard from "./summary-card";
import type { Transaction } from "@/store/transaction.store";

interface Props {
    transactions: Transaction[];
}

function SummaryComponent(props: Props) {
    const { transactions } = props

    const income = useMemo(
        () => {
            return transactions
                .filter((pri) => pri.type == "income")
                .map((pri) => pri.amount)
                .reduce((pri, current) => {
                    const newValue = pri + current
                    return newValue
                }, 0)
        }, [transactions])

    const expense = useMemo(
        () => {
            return transactions
                .filter((pri) => pri.type == "expense")
                .map((pri) => pri.amount)
                .reduce((pri, current) => {
                    const newValue = pri + current
                    return newValue
                }, 0)
        }, [transactions])

    const balance = income - expense;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard id="total-bcalance-counter" title="Total Balance"   value={balance} />
            <SummaryCard id="income-counter" title="Income" value={income} />
            <SummaryCard id="expenses-counter" title="Expenses" value={expense} />
        </div>
    )
}

export default React.memo(SummaryComponent)
