import {
  CreditCardIcon,
  FileBracesIcon,
  FileCodeIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"

 function ExportTransactionDropdown() {
  return (
    <DropdownMenu>
      {/* <DropdownMenuTrigger asChild> */}
      <DropdownMenuTrigger render={<Button variant="outline">Export</Button>}>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
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

export default  React.memo(ExportTransactionDropdown)