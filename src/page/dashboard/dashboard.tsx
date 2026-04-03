
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
import { useTransactionStore, type Transaction } from "@/store/transaction.store";
import Setting from "@/feature/dashboard/component/setting/setting";
import SummaryCard from "@/feature/dashboard/component/summary-card";
import ExportTransaction from "@/feature/dashboard/component/export-transaction";
import SelectTransaction from "@/feature/dashboard/component/transaction/select-transaction"
import { useRoleStore } from "@/store/role.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

export default function Dashboard() {

  const income = 900
  const expense = 400
  const balance = income - expense;

  const { role } = useRoleStore();
  const { transactions } = useTransactionStore()
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTx = useMemo(() => {
    return transactions
      .filter((tx) => filter === "all" || tx.type === filter)
      .filter((tx) => tx.category.toLowerCase().includes(search.toLowerCase()));
  }, [search, filter]);


  // Line chart data (group by date)
  const trendData = transactions.map((t) => {
    return {
      date: t.date.slice(5),
      amount: t.type === "expense" ? -t.amount : t.amount,
    }
  });


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


        {/* Transactions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <SelectTransaction
                id="select-filter"
                filter={filter}
                onFilterChange={(value) => {
                  setFilter(value)
                }}
              />

              <Input
                placeholder="Search category..."
                className="border p-2 min-w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <ExportTransaction />
              {role === "admin" && (
                <Button >Add Transaction</Button>
                // <button className="bg-black text-white px-4 py-2 rounded">
                //   + 
                // </button>
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

