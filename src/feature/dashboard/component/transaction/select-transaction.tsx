import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from "react"
import { roles, useRoleStore } from "@/store/role.store"
import { mockTransactions } from "../../mock-data";

const typeAllList = mockTransactions?.map((t) => t.type)
const typeList = [...new Set(typeAllList), "all"]

interface Props {
    id: string;
    filter: string
    onFilterChange: (filter: string) => void
}

function SelectTransaction(props: Props) {
    const { id, filter, onFilterChange } = props
    return (
        <Select
            id={id}
            value={filter}
            onValueChange={(value) => {
                onFilterChange(value!)
            }}
        >
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Choose a role" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup >
                    {/* <SelectLabel>Role</SelectLabel> */}
                    {
                        typeList?.map((type) => {
                            return (
                                <SelectItem
                                    key={type}
                                    value={type}
                                    className={'capitalize'}
                                >
                                    {type}
                                </SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default React.memo(SelectTransaction)