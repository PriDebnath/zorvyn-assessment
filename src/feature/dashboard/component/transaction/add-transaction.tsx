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

interface Props {

}
//    id: number;
//     date: string;
//     category: string;
//     type: string;
//     amount: number;
function AddTransaction(props: Props) {
    const tanstackForm = useForm({
        defaultValues: {
            category: ""
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
                <form onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    tanstackForm.handleSubmit()
                }} >
                    <tanstackForm.Field
                        name="category"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? 'A first name is required'
                                    : value.length < 3
                                        ? 'First name must be at least 3 characters'
                                        : undefined,
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 1000))
                                return (
                                    value.includes('error') && 'No "error" allowed in first name'
                                )
                            },
                        }}
                        children={(field) => {
                            // Avoid hasty abstractions. Render props are great!
                            return (
                                <div className="flex items-center gap-2">
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
                                    {/* <FieldInfo field={field} /> */}
                                </div>
                            )
                        }}
                    />
                </form>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default React.memo(AddTransaction)