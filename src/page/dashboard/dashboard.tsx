import SummaryCard from "@/feature/flow/component/summary-card";
import React, { useEffect, useState } from "react";


export default function Dashboard() {

  const income = 900
  const expense = 400
  const balance = income - expense;

  return (
    <div className="h-screen  flex flex-col">
      <h1 className="p-2 bg-gray-200">Finance Dashboard</h1>
      <div className="flex items-center p-4 gap-4">
   <SummaryCard title="Total Balance" value={balance} />
      <SummaryCard title="Income" value={income} />
      <SummaryCard title="Expenses" value={expense} />
      </div>
   
    </div>
  );
}

