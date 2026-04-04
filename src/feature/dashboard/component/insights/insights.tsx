import React, { useMemo } from "react";
import type { Transaction } from "@/store/transaction.store";

interface Props {
  transactions: Transaction[];
}

function InsightsComponent({ transactions }: Props) {
  // 1️⃣ Highest Spending Category
  const highestCategory = useMemo(() => {
    const totals: Record<string, number> = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      });

    const [category, amount] = Object.entries(totals).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["", 0]
    );

    return { category, amount };
  }, [transactions]);

  // 2️⃣ Monthly Comparison (income vs expense per month)
  const monthlyComparison = useMemo(() => {
    const data: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((t) => {
      const key = t.date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!data[key]) {
        data[key] = { income: 0, expense: 0 };
      }

      data[key][t.type] += t.amount;
    });

    return data;
  }, [transactions]);

  // 3️⃣ Simple Observation
  const observation = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    if (expense > income) return "Expenses are higher than income.";
    return "Income covers expenses.";
  }, [transactions]);

  return (
 <>
      {/* Highest Spending Category */}
      <p>
        <strong>Highest Spending Category:</strong>{" "}
        {highestCategory.category} (₹{highestCategory.amount})
      </p>

      {/* Monthly Comparison */}
      <div>
        <strong>Monthly Comparison:</strong>
        <ul className="ml-5 list-disc">
          {Object.entries(monthlyComparison).map(([month, val]) => (
            <p key={month} 
            className="bg-gray-100  hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded p-2 m-1">
             • {month}: Income ₹{val.income} | Expense ₹{val.expense}
            </p>
          ))}
        </ul>
      </div>

      {/* Observation */}
      <p>
        <strong>Observation:</strong> {observation}
      </p>
    </>
  );
}

export default React.memo(InsightsComponent);