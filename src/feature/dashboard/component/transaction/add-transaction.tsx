import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { useTransactionStore, type Transaction } from "@/store/transaction.store"
import SelectTransaction from "./select-transaction"
import { mockTransactions } from "../../mock-data"
import DatePicker from "./date-picker"

const typeAllList = mockTransactions?.map((t) => t.type)
const typeList = [...new Set(typeAllList),]

interface Props {

}

function AddTransaction(props: Props) {
    const [open,setOpen] = useState(false)
    const {createTransaction } = useTransactionStore()
    const defaultValues: Transaction = {
        category: "",
        amount: 100,
        date: new Date(),
        id: new Date().getTime(),
        type: "income"
    }
    const tanstackForm = useForm({
        defaultValues: defaultValues,
        validators: {
            onChange: ({ value }) => {
                return {
                    fields: {
                        type: (value.type != 'expense') && (value.type != 'income')
                            ? 'Type should be expense or expense' : undefined,
                                category:
          !value.category ? "Category is required" : undefined,
  
                    },

                }
            },

        },
        onSubmit: async (submitData) => {
            const {value} = submitData
        
            
            console.log(value)
            createTransaction(value)
                tanstackForm.reset({
      ...defaultValues,
      id: new Date().getTime(),
    })
            setOpen(false)

        },
    })
    return (
        <Dialog open={open} onOpenChange={setOpen}> 
            <DialogTrigger render={<Button> Add Transaction</Button>} />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Enter transaction details below.
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        tanstackForm.handleSubmit()
                    }} >

                    <tanstackForm.Field
                        name="type"
                        children={(field) => {
                            return (
                                <div className="flex  flex-col  gap-2">
                                    <Label htmlFor={field.name} className="capitalize">
                                        {field.name}
                                    </Label>
                                    <SelectTransaction
                                    typeList={typeList}
                                        id={field.name}
                                        filter={field.state.value}
                                        onFilterChange={(value) => {
                                            field.handleChange(value as Transaction['type'])
                                        }}
                                    />

                                    {field.state.meta.errors.length > 0 && (
                                        <div className="text-red-500 text-sm">
                                            {field.state.meta.errors[0]}
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                    />
                    <tanstackForm.Field
                        name="category"
                        children={(field) => {
                            return (
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor={field.name} className="capitalize">
                                        {field.name}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <div className="text-red-500 text-sm">
                                            {field.state.meta.errors[0]}
                                        </div>
                                    )}                                </div>
                            )
                        }}
                    />

                    <tanstackForm.Field
                        name="date"
                        children={(field) => {
                            return (
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor={field.name} className="capitalize">
                                        {field.name}
                                    </Label>
                                    <DatePicker
                                      id={field.name}
                                        date={field.state.value}
                                        onDateChange={(value) => {
                                            field.handleChange(value as Transaction['date'])
                                        }}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <div className="text-red-500 text-sm">
                                            {field.state.meta.errors[0]}
                                        </div>
                                    )}                                </div>
                            )
                        }}
                    />

                    <tanstackForm.Field
                        name="amount"
                        children={(field) => {
                            return (
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor={field.name} className="capitalize">
                                        {field.name}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        type="number"
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <div className="text-red-500 text-sm">
                                            {field.state.meta.errors[0]}
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                    />
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default React.memo(AddTransaction)