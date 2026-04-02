import React, { useEffect, useMemo, useState } from "react";
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
import ExportTransaction from "@/feature/dashboard/component/export-transaction";
import Setting from "@/feature/dashboard/component/setting/setting";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

export default function Dashboard() {

  const income = 900
  const expense = 400
  const balance = income - expense;

  const [role, setRole] = useState("admin");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTx = useMemo(() => {
    return mockTransactions
      .filter((tx) => filter === "all" || tx.type === filter)
      .filter((tx) => tx.category.toLowerCase().includes(search.toLowerCase()));
  }, [search, filter]);


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
    <div className="  flex flex-col">
      <div className="flex justify-between bg-gray-200 p-4">
        <h1 className="">Finance Dashboard</h1>
        <Setting />
      </div>
      <div className="p-4 flex flex-col gap-4">
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


        {/* Transactions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <div className="flex justify-between">
            <div className="flex gap-2 flex-wrap">
              <select
                className="border p-2 rounded"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                placeholder="Search category..."
                className="border p-2 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <ExportTransaction />
              {role === "admin" && (
                <button className="bg-black text-white px-4 py-2 rounded">
                  + Add Transaction
                </button>
              )}
            </div>

          </div>

          <div className="border rounded overflow-hidden">
            {filteredTx.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No transactions found.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">Date</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Amount</th>
                    {role === "admin" && <th className="p-2">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredTx.map((tx) => (
                    <tr key={tx.id} className="text-center border-t">
                      <td className="p-2">{tx.date}</td>
                      <td className="p-2">{tx.category}</td>
                      <td className="p-2">{tx.type}</td>
                      <td className="p-2">
                        {tx.type === "expense" ? "-" : "+"}₹{tx.amount}
                      </td>
                      {role === "admin" && (
                        <td className="p-2 space-x-2">
                          <button className="text-blue-500">Edit</button>
                          <button className="text-red-500">Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>


        </div>

      </div>

    </div>
  );
}

