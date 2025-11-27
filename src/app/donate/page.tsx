'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const donationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  amount: z.coerce.number().min(1).positive(),
  message: z.string().optional(),
});

const heroImage = PlaceHolderImages.find(p => p.id === 'donate-hero');

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 50,
    },
  });

  async function onSubmit(values: z.infer<typeof donationSchema>) {
    setLoading(true);
    try {
      if (!db) {
        // Firestore not configured — show manual instructions instead.
        toast({ title: 'Thank you', description: 'Thank you for your intent to donate. Our team will follow up with manual instructions.', });
        setLoading(false);
        return;
      }

      await addDoc(collection(db, 'pledges'), {
        name: values.name ?? null,
        email: values.email ?? null,
        amount: values.amount,
        message: values.message ?? null,
        createdAt: serverTimestamp(),
      });

      toast({ title: 'Thank you!', description: 'Your pledge has been recorded.' });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to record your pledge. Please try again later.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="relative h-[40vh] min-h-[300px] w-full bg-primary/20 flex items-center justify-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Support Our Mission</h1>
          <p className="mt-2 max-w-2xl text-lg text-primary-foreground">
            Your intent to support SEQHER matters — submit a pledge below and we'll follow up with details.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold font-headline text-center mb-2">Make a Pledge</h2>
          <p className="text-center text-muted-foreground mb-6">
            Enter your details and amount. If online payment is not configured, our team will reach out with manual instructions.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
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
                    <FormLabel>Email (optional)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Any message for us" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full h-14 text-xl bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Submit Pledge'}
              </Button>
            </form>
          </Form>

          {!db && (
            <div className="mt-8 p-4 border rounded">
              <h3 className="font-semibold">Manual Donation Instructions</h3>
              <p className="text-sm text-muted-foreground mt-2">Online payments are not configured. To make a donation now, please contact us at <a className="underline" href="mailto:donate@example.org">donate@example.org</a> and we'll provide bank transfer or alternative payment details.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
