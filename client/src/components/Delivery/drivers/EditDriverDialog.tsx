'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const provinces = [
  "Punjab",
  "Sindh",
  "KPK",
  "Balochistan",
  "Gilgit-Baltistan",
  "AJK",
  "ICT"
]

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  cnicNumber: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, 'Invalid CNIC format (e.g., 12345-1234567-1)'),
  phoneNumber: z.string().regex(/^(\+92|0)?[0-9]{10}$/, 'Invalid Pakistani phone number'),
  licenseNumber: z.string().min(5, 'License number is required'),
  yearsOfExperience: z.number().min(0, 'Experience cannot be negative'),
  assignedBus: z.string().min(1, 'Please select a bus'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    province: z.string().min(1, 'Province is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
  }),
})

interface EditDriverDialogProps {
  driver: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditDriverDialog({
  driver,
  open,
  onOpenChange,
  onSuccess
}: EditDriverDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: driver.name,
      cnicNumber: driver.cnicNumber,
      phoneNumber: driver.phoneNumber,
      licenseNumber: driver.licenseNumber,
      yearsOfExperience: driver.yearsOfExperience,
      assignedBus: driver.assignedBus?._id || '',
      address: {
        street: driver.address.street,
        city: driver.address.city,
        province: driver.address.province,
        postalCode: driver.address.postalCode,
      },
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/drivers/${driver._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      
      if (!response.ok) throw new Error('Failed to update driver')
      
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Error updating driver:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Driver</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Reuse the same form fields as AddDriverDialog */}
            {/* Copy the form fields from AddDriverDialog and paste them here */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

