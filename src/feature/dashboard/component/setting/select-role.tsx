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

interface Props {
    id: string
}

function SelectRole(props: Props) {
    const { id } = props
    const { role, setRole } = useRoleStore()
    return (
        <Select
            id={id}
            value={role}
            onValueChange={(value) => {
                setRole(value!)
            }}
        >
            <SelectTrigger className="w-full ">
                <SelectValue placeholder="Choose a role" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup >
                    <SelectLabel>Role</SelectLabel>
                    {
                        roles?.map((role) => {
                            return (
                                <SelectItem
                                    key={role}
                                    value={role}
                                    className={'capitalize'}
                                >
                                    {role}
                                </SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default React.memo(SelectRole)