import type { Transaction } from "@/store/transaction.store";

 
export const mockTransactions: Transaction[] = [
  { id: 1, date: new Date("04-01-2025"), category: "Food", type: "expense", amount: 10000 },
  { id: 2, date: new Date("03/09/2025"), category: "Salary", type: "income", amount: 75000 },
  { id: 3, date: new Date("2026-03-28"), category: "Shopping", type: "expense", amount: 2000 },
  { id: 4, date: new Date("2026-03-30"), category: "Rent", type: "expense", amount: 15000 },
];
