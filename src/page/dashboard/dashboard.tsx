import React, { useEffect, useMemo, useState } from "react";
import SummaryComponent from "@/feature/dashboard/summary/summary";
import Setting from "@/feature/dashboard/component/setting/setting";
import { useTransactionStore, type Transaction } from "@/store/transaction.store";
import TransactionComponent from "@/feature/dashboard/component/transaction/transaction";
import VisualizationComponent from "@/feature/dashboard/component/visualization/visualization";


export default function Dashboard() {
  const { transactions } = useTransactionStore()

  return (
    <div className="  flex flex-col bg-gray-50">
     
      <div className="flex justify-between bg-gray-200 p-2 sticky top-0 shadow-lg">
        <h1 className="">Finance Dashboard</h1>
        <Setting />
      </div>

      <div className="p-4 flex flex-col gap-8">
        <SummaryComponent transactions={transactions} />
        <VisualizationComponent transactions={transactions} />
        <TransactionComponent transactions={transactions} />
      </div>

    </div>
  );
}

