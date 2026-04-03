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
import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import type { Transaction } from "@/store/transaction.store"

interface Props {

}
//    id: number;
//     date: string;
//     category: string;
//     type: string;
//     amount: number;
function AddTransaction(props: Props) {
    const defaultValues: Transaction = {
        category: "food",
        amount: 100,
        date: '00',
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
                    },
                }
            },

        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log(value)
        },
    })
    return (
        <Dialog>
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
                            // Avoid hasty abstractions. Render props are great!
                            return (
                                <div className="flex  flex-col  gap-2">
                                    <Label htmlFor={field.name} className="capitalize">
                                        {field.name}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value as Transaction['type'])}
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
                            // Avoid hasty abstractions. Render props are great!
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