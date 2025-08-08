'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Droplets, FlaskConical, Scale } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const brewingTopics = [
  {
    title: 'Sanitation 101',
    description: 'The most critical step. Learn how to properly clean and sanitize your equipment to prevent contamination.',
    icon: <Droplets className="h-8 w-8 text-primary" />,
    image: 'https://placehold.co/600x400.png',
    hint: 'cleaning supplies'
  },
  {
    title: 'Understanding Your Ingredients',
    description: 'Honey, water, yeast, and optional fruits or spices. Discover how each component affects the final product.',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    image: 'https://placehold.co/600x400.png',
    hint: 'ingredients layout'
  },
  {
    title: 'The Fermentation Process',
    description: 'From yeast pitching to final gravity. A deep dive into the science of turning sugar into alcohol.',
    icon: <FlaskConical className="h-8 w-8 text-primary" />,
    image: 'https://placehold.co/600x400.png',
    hint: 'fermentation bubbles'
  },
  {
    title: 'Measuring Specific Gravity',
    description: 'Using a hydrometer is key to tracking fermentation progress and calculating the final ABV of your brew.',
    icon: <Scale className="h-8 w-8 text-primary" />,
    image: 'https://placehold.co/600x400.png',
    hint: 'hydrometer measurement'
  },
];

export default function DashboardPage() {
  const router = useRouter();

  // Placeholder authentication check
  const isAuthenticated = true;

  if (!isAuthenticated) {
    router.push('/');
    return null; // Or a loading spinner, etc.
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Welcome, Brewer!</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Your journey into the world of mead making starts here.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brewingTopics.map((topic, index) => (
          <Card key={index} className="overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
             <CardHeader className="p-0">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={topic.hint}
                />
              </CardHeader>
            <CardContent className="p-6 flex-grow">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        {topic.icon}
                    </div>
                    <div className="flex-1">
                        <CardTitle className="font-headline text-2xl mb-2">{topic.title}</CardTitle>
                        <CardDescription className="text-base">{topic.description}</CardDescription>
                    </div>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
