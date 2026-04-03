
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import React, { useEffect, useMemo, useState } from "react";
import Setting from "@/feature/dashboard/component/setting/setting";
import SummaryCard from "@/feature/dashboard/component/summary-card";
import { useTransactionStore, type Transaction } from "@/store/transaction.store";
import TransactionComponent from "@/feature/dashboard/component/transaction/transaction";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

export default function Dashboard() {
  const { transactions } = useTransactionStore()

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

  // Line chart data (group by date)
  // const trendData = transactions.map((t) => {
  //   return {
  //     date: t.date,
  //     // new Date(typeof t?.date != 'string' ? t?.date?.toLocaleDateString() : "").toLocaleDateString(),
  //     amount: t.type === "expense" ? -t.amount : t.amount,
  //   }
  // });
  console.log({transactions,});


  // Pie chart data (category breakdown)
  const expenseTransactions = transactions.filter((t) => t.type === "expense")

  return (
    <div className="  flex flex-col bg-gray-50">
      <div className="flex justify-between bg-gray-200 p-2 sticky top-0 shadow-lg">
        <h1 className="">Finance Dashboard</h1>
        <Setting />
      </div>
      <div className="p-4 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard title="Total Balance" value={balance} />
          <SummaryCard title="Income" value={income} />
          <SummaryCard title="Expenses" value={expense} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded h-72">
            <h3 className="mb-2 font-semibold">Balance Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactions}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="py-8 px-4 pt-4 border rounded h-72">
            <h3 className="mb-2 font-semibold">Spending Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseTransactions}
                  dataKey={"amount" satisfies keyof Transaction}
                  nameKey={"category" satisfies keyof Transaction}
                  outerRadius={80}
                  label
                >
                  {expenseTransactions.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        <TransactionComponent transactions={transactions} />


      </div>

    </div>
  );
}

