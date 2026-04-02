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
import { themes, useThemeStore } from "@/store/theme.store"

interface Props {
    id: string
}

export function SelectRole(props: Props) {
    const { id } = props
    const { theme, setTheme } = useThemeStore()
    return (
        <Select
            id={id}
            value={theme}
            onValueChange={(value) => { 
                setTheme(value!)
             }}
        >
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Choose a theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup >
                    <SelectLabel>Theme</SelectLabel>
                    {
                        themes?.map((theme) => {
                            return (
                                <SelectItem
                                    key={theme}
                                    value={theme}
                                    className={'capitalize'}
                                >
                                    {theme}
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