import React, { useEffect, useMemo, useState } from "react";
import SummaryComponent from "@/feature/dashboard/summary/summary";
import Setting from "@/feature/dashboard/component/setting/setting";
import InsightsComponent from "@/feature/dashboard/component/insights/insights";
import { useTransactionStore, type Transaction } from "@/store/transaction.store";
import TransactionComponent from "@/feature/dashboard/component/transaction/transaction";
import VisualizationComponent from "@/feature/dashboard/component/visualization/visualization";

export default function Dashboard() {
  const { transactions } = useTransactionStore()

  return (
    <div className="  flex flex-col bg-gray-50">

      <div className="flex justify-between bg-gray-200 p-2 sticky z-50 top-0 shadow-lg">
        <h1 className="">Finance Dashboard</h1>
        <Setting />
      </div>

      <div className="p-4 flex flex-col gap-8">
        <div className="bg-white p-4 rounded-2xl flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Overview</h2>
        <SummaryComponent transactions={transactions} />
        <VisualizationComponent transactions={transactions} />
        </div>

         <div className=" bg-white p-4 rounded-2xl flex flex-col gap-2 "  >
            <h2 className="text-xl font-semibold">Transactions</h2>
        <TransactionComponent transactions={transactions} />
 </div>
                <InsightsComponent transactions={transactions} />

      </div>

    </div>
  );
}

