import React, { useEffect, useState } from "react";
import SummaryCard from "@/feature/dashboard/component/summary-card";
import { mockTransactions } from "@/feature/dashboard/mock-data";
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
import type { Transactions } from "@/model";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

export default function Dashboard() {

  const income = 900
  const expense = 400
  const balance = income - expense;

  // Line chart data (group by date)
  const trendData = mockTransactions.map((t) => {
    return {
      date: t.date.slice(5),
      amount: t.type === "expense" ? -t.amount : t.amount,
    }
  });


  // Pie chart data (category breakdown)
  const expenseTransactions = mockTransactions.filter((t) => t.type === "expense")

  return (
    <div className="h-screen  flex flex-col">
      <h1 className="p-2 bg-gray-200">Finance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Total Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded h-64">
          <h3 className="mb-2 font-semibold">Balance Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 border rounded h-64">
          <h3 className="mb-2 font-semibold">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseTransactions}
                dataKey={"amount" satisfies keyof Transactions}
                nameKey={"category" satisfies keyof Transactions}
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
    </div>
  );
}

