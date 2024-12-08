'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteDriverDialogProps {
  driver: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeleteDriverDialog({
  driver,
  open,
  onOpenChange,
  onSuccess
}: DeleteDriverDialogProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/drivers/${driver._id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete driver')
      
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Error deleting driver:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Driver</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {driver.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

