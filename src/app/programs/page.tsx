import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Program } from '@/lib/types';


export const metadata = {
  title: 'Our Programs | SEQHER',
  description: 'Explore the various programs and initiatives by SEQHER aimed at fostering sustainable development.',
};

const programsHeroImage = PlaceHolderImages.find(p => p.id === 'programs-hero');

async function getPrograms(): Promise<Program[]> {
  const programsCol = collection(db, 'programs');
  const programSnapshot = await getDocs(programsCol);
  const programList = programSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Program));
  return programList;
}

export default async function ProgramsPage() {
  const programs = await getPrograms();
  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] w-full bg-primary/20 flex items-center justify-center">
        {programsHeroImage && (
          <Image
            src={programsHeroImage.imageUrl}
            alt={programsHeroImage.description}
            fill
            className="object-cover"
            data-ai-hint={programsHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Programs</h1>
          <p className="mt-2 max-w-2xl text-lg text-primary-foreground">
            Driving change through targeted, sustainable initiatives.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
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
                  </CardHeader>
                  <div className="p-6 flex flex-col flex-grow">
                    <CardTitle className="font-headline text-xl mb-2">{program.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {program.sdgGoals.map(goal => (
                            <Badge key={goal} variant="secondary">SDG {goal}</Badge>
                        ))}
                    </div>
                    <CardContent className="p-0 flex-grow">
                      <p className="text-muted-foreground line-clamp-4">{program.summary}</p>
                    </CardContent>
                    <div className="pt-4 mt-auto">
                      <Button asChild variant="link" className="p-0 text-primary">
                          <Link href={`/programs/${program.id}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
