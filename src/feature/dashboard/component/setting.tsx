import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import {Settings} from "lucide-react"
import SelectRole from "./select-role"

 function SettingDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline"><Settings/></Button>}>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
          <DialogDescription>
            Change settings here...
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid gap-2">
            <Label htmlFor="Role" >
              Role
            </Label>
            <SelectRole  id="Role"/>
          </div>

          <div className="grid gap-2">
             
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