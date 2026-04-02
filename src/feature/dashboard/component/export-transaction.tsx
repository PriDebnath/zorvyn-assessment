import {
    CreditCardIcon,
    FileBracesIcon,
    FileCodeIcon,
    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import { Button } from "@/components/ui/button"
import { useTransactionStore, type Transaction } from "@/store/transaction.store"
 
function downloadFile(content: string, fileName: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

function convertToCSV(data: Transaction[]) {
    const firstItem = data[0]
    const firstItemKeys = Object.keys(firstItem)
    const headers = firstItemKeys.join(",")

    const dataValues = data.map(obj => {
        return Object.values(obj)
    })
    const rows = dataValues.join(",")
    return [headers, ...rows].join("\n")
}

function ExportTransactionDropdown() {
  const { transactions } = useTransactionStore()

    const handleExportCSV = () => {
        const csv = convertToCSV(transactions)
        downloadFile(csv, "transactions.csv", "text/csv")
    }

    return (
        <DropdownMenu>
            {/* <DropdownMenuTrigger asChild> */}
            <DropdownMenuTrigger render={<Button variant="outline">Export</Button>}>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleExportCSV}>
                    <FileCodeIcon />
                    CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <FileBracesIcon />
                    JSON
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default React.memo(ExportTransactionDropdown)