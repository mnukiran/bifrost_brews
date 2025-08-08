// 'use server';

/**
 * @fileOverview Suggests variations on a mead recipe based on user preferences and available ingredients.
 *
 * - suggestMeadVariations - A function that handles the mead recipe variation suggestion process.
 * - SuggestMeadVariationsInput - The input type for the suggestMeadVariations function.
 * - SuggestMeadVariationsOutput - The return type for the suggestMeadVariations function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMeadVariationsInputSchema = z.object({
  baseRecipe: z
    .string()
    .describe('The base mead recipe to generate variations from.'),
  preferences: z
    .string()
    .describe(
      'User preferences for the mead, such as sweeter, fruitier, or higher ABV.'
    ),
  availableIngredients: z
    .string()
    .describe('A list of available ingredients for the mead variation.'),
});
export type SuggestMeadVariationsInput = z.infer<
  typeof SuggestMeadVariationsInputSchema
>;

const SuggestMeadVariationsOutputSchema = z.object({
  suggestedVariations: z
    .string()
    .describe('Suggested variations on the mead recipe.'),
});
export type SuggestMeadVariationsOutput = z.infer<
  typeof SuggestMeadVariationsOutputSchema
>;

export async function suggestMeadVariations(
  input: SuggestMeadVariationsInput
): Promise<SuggestMeadVariationsOutput> {
  return suggestMeadVariationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMeadVariationsPrompt',
  input: {schema: SuggestMeadVariationsInputSchema},
  output: {schema: SuggestMeadVariationsOutputSchema},
  prompt: `You are an expert mead maker.  A user provides a base recipe, desired
preferences, and available ingredients.  You should generate a variation on the recipe that satisfies their needs.

Base Recipe: {{{baseRecipe}}}
Preferences: {{{preferences}}}
Available Ingredients: {{{availableIngredients}}}`,
});

const suggestMeadVariationsFlow = ai.defineFlow(
  {
    name: 'suggestMeadVariationsFlow',
    inputSchema: SuggestMeadVariationsInputSchema,
    outputSchema: SuggestMeadVariationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
