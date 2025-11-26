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
import { createCheckoutSession } from './actions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const donationSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: 'Please enter a valid amount.' })
    .min(5, { message: 'Donation must be at least $5.' })
    .positive(),
});

const presetAmounts = [25, 50, 100, 250];
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
      const { url } = await createCheckoutSession(values.amount);
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Could not create Stripe checkout session.');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to initiate donation. Please try again.",
        variant: "destructive"
      });
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
            Your generosity fuels our work and creates lasting change.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold font-headline text-center mb-2">Make a Donation</h2>
          <p className="text-center text-muted-foreground mb-10">
            Every contribution helps us empower communities and protect our planet.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={form.watch('amount') === amount ? 'default' : 'outline'}
                    onClick={() => form.setValue('amount', amount, { shouldValidate: true })}
                    className="h-16 text-lg"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Or enter a custom amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          placeholder="50"
                          className="pl-7 h-14 text-2xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full h-14 text-xl bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Donate Now'}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
