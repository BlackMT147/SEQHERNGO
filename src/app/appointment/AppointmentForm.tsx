'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { AppUser } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { bookAppointment } from './actions';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const appointmentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
  appointmentDate: z.date({
    required_error: 'A date for the appointment is required.',
  }),
  appointmentType: z.enum(['volunteering', 'partnership', 'general']),
  message: z.string().max(500).optional(),
});

type AppointmentFormProps = {
  user: AppUser;
};

export default function AppointmentForm({ user }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: user.displayName || '',
      email: user.email || '',
      appointmentType: 'general',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof appointmentSchema>) {
    setLoading(true);
    try {
      const result = await bookAppointment(values);
      if (result.success) {
        toast({
          title: 'Appointment Requested',
          description: 'Thank you! We will be in touch shortly to confirm your appointment.',
        });
        form.reset();
      } else {
        toast({
          title: 'Error',
          description: result.message || 'There was an issue submitting your request.',
          variant: 'destructive',
        });
        if (result.field) {
            form.setError(result.field as keyof z.infer<typeof appointmentSchema>, {
                type: 'server',
                message: result.message,
            });
        }
      }
    } catch (error) {
      toast({
        title: 'Server Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Request an Appointment</CardTitle>
            <CardDescription>Fill out the form below and our team will get back to you.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                         <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="appointmentType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Reason for Appointment</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="volunteering">Volunteering Inquiry</SelectItem>
                            <SelectItem value="partnership">Partnership Proposal</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Preferred Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={'outline'}
                            className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                            )}
                            >
                            {field.value ? (
                                format(field.value, 'PPP')
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Tell us a bit more about how we can help"
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Max 500 characters.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Request Appointment
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
