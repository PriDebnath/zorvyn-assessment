import type { Transaction } from "@/store/transaction.store";

 
export const mockTransactions: Transaction[] = [
  { id: 1, date: new Date("2026-04-01"), category: "Food", type: "expense", amount: 500 },
  { id: 2, date: new Date("2026-03-30"), category: "Salary", type: "income", amount: 50000 },
  { id: 3, date: new Date("2026-03-28"), category: "Shopping", type: "expense", amount: 2000 },
  { id: 4, date: new Date("2026-03-25"), category: "Rent", type: "expense", amount: 15000 },
];
