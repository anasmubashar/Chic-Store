import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ProfileData } from '@/types/profile';

const phoneRegex = /^(\+92|0)?[0-9]{10}$/;

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  numberOfBuses: z.number().min(1, 'Must have at least one bus'),
  numberOfDrivers: z.number().min(1, 'Must have at least one driver'),
  contactDetails: z.object({
    phoneNumber: z.string().regex(phoneRegex, 'Invalid Pakistani phone number'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
  }),
  cities: z.array(z.object({
    name: z.string(),
    isActive: z.boolean(),
  })),
});

interface ProfileFormProps {
  initialData?: ProfileData;
  onSubmit: (data: ProfileData) => void;
  onCancel: () => void;
}

export function ProfileForm({ initialData, onSubmit, onCancel }: ProfileFormProps) {
  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData || {
      name: '',
      location: '',
      numberOfBuses: 1,
      numberOfDrivers: 1,
      contactDetails: {
        phoneNumber: '',
        address: '',
      },
      cities: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactDetails.phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="+92XXXXXXXXXX" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactDetails.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfBuses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Buses</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfDrivers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Drivers</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}