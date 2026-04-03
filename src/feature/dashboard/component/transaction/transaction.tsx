import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useMemo, useState } from "react"
import { roles, useRoleStore } from "@/store/role.store"
import { mockTransactions } from "../../mock-data";
import { useTransactionStore } from "@/store/transaction.store";
import SelectTransaction from "./select-transaction";
import { Input } from "@/components/ui/input";
import ExportTransaction from "../export-transaction";
import { Button } from "@/components/ui/button";
import AddTransaction from "./add-transaction";

const typeAllList = mockTransactions?.map((t) => t.type)
const typeList = [...new Set(typeAllList), "all"]

interface Props {
}

function TransactionComponent(props: Props) {
    const { role } = useRoleStore();
    const { transactions } = useTransactionStore()
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredTx = useMemo(() => {
        return transactions
            .filter((tx) => filter === "all" || tx.type === filter)
            .filter((tx) => tx.category.toLowerCase().includes(search.toLowerCase()));
    }, [search, filter]);

    return (
        <div className="space-y-4" id="Transaction">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <SelectTransaction
                        id="select-filter"
                        typeList={typeList}
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
                        <AddTransaction/>
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
    )
}

export default React.memo(TransactionComponent)