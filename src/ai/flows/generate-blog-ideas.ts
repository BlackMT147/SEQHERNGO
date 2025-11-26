'use server';

/**
 * @fileOverview Blog idea generation flow.
 *
 * - generateBlogIdeas - A function that generates blog ideas based on SDG trends and program initiatives.
 * - GenerateBlogIdeasInput - The input type for the generateBlogIdeas function.
 * - GenerateBlogIdeasOutput - The return type for the generateBlogIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogIdeasInputSchema = z.object({
  sdgTrends: z.string().describe('Current trends related to the Sustainable Development Goals.'),
  programInitiatives: z.string().describe('Description of SEQHERs program initiatives.'),
});
export type GenerateBlogIdeasInput = z.infer<typeof GenerateBlogIdeasInputSchema>;

const GenerateBlogIdeasOutputSchema = z.object({
  blogIdeas: z.array(z.string()).describe('Array of suggested blog post ideas.'),
});
export type GenerateBlogIdeasOutput = z.infer<typeof GenerateBlogIdeasOutputSchema>;

export async function generateBlogIdeas(input: GenerateBlogIdeasInput): Promise<GenerateBlogIdeasOutput> {
  return generateBlogIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogIdeasPrompt',
  input: {schema: GenerateBlogIdeasInputSchema},
  output: {schema: GenerateBlogIdeasOutputSchema},
  prompt: `You are a content creation expert for an NGO called SEQHER, which is aligned with the SDG GOALS.

  Based on the current SDG trends and SEQHER's program initiatives, generate a list of relevant and engaging blog post ideas.

  Current SDG Trends: {{{sdgTrends}}}
  SEQHER Program Initiatives: {{{programInitiatives}}}

  Blog Post Ideas:
  `,
});

const generateBlogIdeasFlow = ai.defineFlow(
  {
    name: 'generateBlogIdeasFlow',
    inputSchema: GenerateBlogIdeasInputSchema,
    outputSchema: GenerateBlogIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
