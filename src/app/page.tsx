import Image from 'next/image';
import Link from 'next/link';
import { Handshake, Target, Leaf, HeartHandshake, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { featuredPrograms } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-community');
const programImage1 = PlaceHolderImages.find(p => p.id === 'program-education');
const programImage2 = PlaceHolderImages.find(p => p.id === 'program-health');

export default function Home() {
  const impactStats = [
    { id: 1, icon: <Handshake className="h-10 w-10 text-primary" />, value: '10,000+', label: 'Lives Impacted' },
    { id: 2, icon: <Target className="h-10 w-10 text-primary" />, value: '15+', label: 'Active Programs' },
    { id: 3, icon: <Leaf className="h-10 w-10 text-primary" />, value: '8', label: 'SDGs Supported' },
    { id: 4, icon: <HeartHandshake className="h-10 w-10 text-primary" />, value: '500+', label: 'Volunteers Engaged' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-primary/20">
        {heroImage && (
           <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            Empowering Communities, Sustaining Futures
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground">
            SEQHER is dedicated to fostering sustainable development and creating lasting change in alignment with global goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/programs">Our Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                At SEQHER, our mission is to drive impactful change by creating and supporting programs that align with the Sustainable Development Goals (SDGs). We focus on key areas such as education, health, and economic empowerment to build resilient and thriving communities.
              </p>
              <p className="text-muted-foreground">
                We believe in a collaborative approach, working hand-in-hand with local partners and volunteers to ensure our initiatives are both effective and sustainable.
              </p>
              <Button asChild className="mt-4">
                <Link href="/about">Learn More <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {programImage1 && <Image src={programImage1.imageUrl} alt={programImage1.description} data-ai-hint={programImage1.imageHint} width={400} height={500} className="rounded-lg shadow-lg object-cover aspect-[4/5]"/>}
              {programImage2 && <Image src={programImage2.imageUrl} alt={programImage2.description} data-ai-hint={programImage2.imageHint} width={400} height={500} className="rounded-lg shadow-lg object-cover aspect-[4/5] mt-8"/>}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Impact at a Glance</h2>
          <p className="mt-2 mb-12 max-w-3xl mx-auto text-muted-foreground">
            Through dedicated effort and generous support, we are making a tangible difference. Here are some of our key achievements.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center">
                {stat.icon}
                <p className="mt-2 text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Featured Programs</h2>
          <p className="mt-2 mb-12 max-w-3xl mx-auto text-center text-muted-foreground">
            Explore some of our key initiatives that are transforming communities and empowering individuals.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => {
              const programImage = PlaceHolderImages.find(p => p.id === program.imageId);
              return (
                <Card key={program.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    {programImage && (
                      <Image
                        src={programImage.imageUrl}
                        alt={program.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                        data-ai-hint={programImage.imageHint}
                      />
                    )}
                    <div className="p-6">
                      <CardTitle className="font-headline text-xl">{program.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{program.summary}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                     <Button asChild variant="link" className="p-0 text-primary">
                        <Link href={`/programs/${program.id}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

       {/* Call to Action Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Make a Difference?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Join us in our mission to create a sustainable and equitable world. Your contribution, big or small, can change lives.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/donate">Donate</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/appointment">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
