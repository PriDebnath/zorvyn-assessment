import type { Transaction } from "@/store/transaction.store";
import React from "react"
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

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

interface Props{
    transactions: Transaction[];
}

function VisualizationComponent(props: Props){
    const { transactions } = props

      // Pie chart data (category breakdown)
  const expenseTransactions = transactions.filter((t) => t.type === "expense")

    return(
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
    )
}

export default React.memo(VisualizationComponent)