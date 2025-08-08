import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const recipes = [
  {
    title: 'Classic Honey Mead (Metheglin)',
    description: 'A traditional mead with a simple yet profound honey flavor.',
    image: 'https://placehold.co/600x400.png',
    hint: 'honey beverage',
    link: '#',
  },
  {
    title: 'Spiced Winter Melomel',
    description: 'A warm and spicy mead perfect for cold evenings, with notes of cinnamon and clove.',
    image: 'https://placehold.co/600x400.png',
    hint: 'spiced drink',
    link: '#',
  },
  {
    title: 'Summer Berry Mead',
    description: 'A fruity and refreshing mead bursting with the flavors of mixed berries.',
    image: 'https://placehold.co/600x400.png',
    hint: 'berry cocktail',
    link: '#',
  },
];

const articles = [
  {
    title: 'The Ancient Art of Mead Making',
    description: 'Explore the rich history of the world\'s oldest alcoholic beverage.',
    image: 'https://placehold.co/600x400.png',
    hint: 'ancient manuscript',
    link: '#',
  },
  {
    title: 'Choosing the Right Honey for Your Brew',
    description: 'A guide to different honey varietals and how they impact your mead\'s flavor.',
    image: 'https://placehold.co/600x400.png',
    hint: 'honey jars',
    link: '#',
  },
  {
    title: 'Sanitation: The Key to a Perfect Batch',
    description: 'Learn the best practices for keeping your brewing equipment clean and sanitized.',
    image: 'https://placehold.co/600x400.png',
    hint: 'brewing equipment',
    link: '#',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-primary">
          Welcome to Bifrost Brews
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the ancient craft of mead making. Explore our tested recipes, learn from our articles, and use our AI to create your own unique variations.
        </p>
      </section>

      <section className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for recipes..." className="pl-10 h-12 text-lg" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold mb-6">Featured Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <Card
              key={index}
              className="overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={recipe.hint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl mb-2">{recipe.title}</CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                 <Select defaultValue="metric">
                  <SelectTrigger className="w-[120px] h-9">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric</SelectItem>
                    <SelectItem value="imperial">Imperial</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="link" asChild>
                  <Link href={recipe.link}>
                    View Recipe <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-bold mb-6">From the Mead Hall</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={article.hint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl mb-2">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" asChild>
                  <Link href={article.link}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
