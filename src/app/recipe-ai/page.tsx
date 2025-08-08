'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestMeadVariations, type SuggestMeadVariationsInput, type SuggestMeadVariationsOutput } from '@/ai/flows/suggest-mead-variations';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, TestTube2, Inbox, Beaker } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  baseRecipe: z.string().min(20, { message: 'Please provide a more detailed base recipe.' }),
  preferences: z.string().min(5, { message: 'Describe your preferences.' }),
  availableIngredients: z.string().min(5, { message: 'List some available ingredients.' }),
});

export default function RecipeAIPage() {
  const [suggestion, setSuggestion] = useState<SuggestMeadVariationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseRecipe: '',
      preferences: '',
      availableIngredients: '',
    },
  });

  async function onSubmit(values: SuggestMeadVariationsInput) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestMeadVariations(values);
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get recipe suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <Wand2 className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">AI Recipe Workshop</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Let our AI mead-maker help you craft the perfect brew. Provide a base recipe, your tastes, and your pantry, and we'll suggest a unique variation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Your Recipe Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="baseRecipe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Recipe</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., 3 lbs honey, 1 gallon water, Lalvin D47 yeast..." {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferences</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., sweeter, more fruity, higher ABV" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="availableIngredients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Ingredients</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., raspberries, cinnamon sticks, orange peel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Brewing Ideas...' : 'Suggest Variation'}
                    <Wand2 className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Suggested Variation</CardTitle>
              <CardDescription>Our AI's recommendation will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : suggestion ? (
                <div className="prose prose-sm max-w-none text-card-foreground whitespace-pre-wrap font-body">
                    {suggestion.suggestedVariations}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                  <Beaker className="h-16 w-16 mb-4" />
                  <h3 className="text-lg font-semibold">Your recipe is waiting</h3>
                  <p>Fill out the form to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
