import React from "react"
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
import SelectRole from "./select-role"
import { Settings } from "lucide-react"
import SelectTheme from "./select-theme"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

function SettingDialog() {
    return (
        <Dialog>
            <DialogTrigger render={<Button variant="outline"><Settings /></Button>}>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Setting</DialogTitle>
                    <DialogDescription>
                        Change settings here...
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col  gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="Role" >
                            Role
                        </Label>
                        <SelectRole id="Role" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="Theme" >
                            Theme
                        </Label>
                        <SelectTheme id="Theme" />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose render={<Button type="button">Close</Button>}></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default React.memo(SettingDialog)