import React, {lazy, Suspense} from "react";
import { Loader } from "@/components/ui/loader";
import { useTransactionStore } from "@/store/transaction.store";
import Setting from "@/feature/dashboard/component/setting/setting";

const SummaryComponent = lazy(() => import('@/feature/dashboard/component/summary/summary').then(mod => ({ default: mod.default })))
const VisualizationComponent = lazy(() => import('@/feature/dashboard/component/visualization/visualization').then(mod => ({ default: mod.default })))
const TransactionComponent = lazy(() => import('@/feature/dashboard/component/transaction/transaction').then(mod => ({ default: mod.default })))
const InsightsComponent = lazy(() => import('@/feature/dashboard/component/insights/insights').then(mod => ({ default: mod.default })))


export default function Dashboard() {
  const { transactions } = useTransactionStore();

  // Shared section styling with dark mode support
  const sectionClass = `
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-gray-100
    p-4 rounded-2xl flex flex-col gap-4
    shadow-sm dark:shadow-none
    border border-transparent dark:border-gray-800
  `;

  const sections = [
    {
      title: "Overview",
      content: (
        <>
                              <SummaryComponent transactions={transactions} />
          <VisualizationComponent transactions={transactions} />
        </>
      ),
    },
    {
      title: "Transactions",
      content: (
        <TransactionComponent transactions={transactions} />
      ),
    },
    {
      title: "Insights",
      content: (
        <InsightsComponent transactions={transactions} />
      ),
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-200 dark:bg-gray-900 p-3 sticky z-50 top-0 shadow-md dark:shadow-none border-b border-gray-300 dark:border-gray-800">
        <h1 className="text-lg font-semibold">Finance Dashboard</h1>
        <Setting />
      </header>

      {/* Content */}
      <main className="p-4 flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.title} className={sectionClass}>
            <h2 className="text-xl font-semibold tracking-tight">
              {section.title}
            </h2>
                                <Suspense fallback={<Loader />}>            {section.content}

</Suspense>
          </section>
        ))}
      </main>
    </div>
  );
}
