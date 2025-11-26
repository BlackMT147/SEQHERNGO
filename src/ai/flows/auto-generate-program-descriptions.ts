'use server';

/**
 * @fileOverview A flow to automatically generate program descriptions using an LLM, based on keywords and goals.
 *
 * - generateProgramDescription - A function that handles the program description generation process.
 * - GenerateProgramDescriptionInput - The input type for the generateProgramDescription function.
 * - GenerateProgramDescriptionOutput - The return type for the generateProgramDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProgramDescriptionInputSchema = z.object({
  keywords: z.string().describe('Keywords related to the program.'),
  goals: z.string().describe('Goals of the program.'),
});
export type GenerateProgramDescriptionInput = z.infer<typeof GenerateProgramDescriptionInputSchema>;

const GenerateProgramDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated program description.'),
});
export type GenerateProgramDescriptionOutput = z.infer<typeof GenerateProgramDescriptionOutputSchema>;

export async function generateProgramDescription(
  input: GenerateProgramDescriptionInput
): Promise<GenerateProgramDescriptionOutput> {
  return generateProgramDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProgramDescriptionPrompt',
  input: {schema: GenerateProgramDescriptionInputSchema},
  output: {schema: GenerateProgramDescriptionOutputSchema},
  prompt: `You are an expert copywriter for an NGO. Generate an engaging and informative program description based on the following keywords and goals.\n\nKeywords: {{{keywords}}}\nGoals: {{{goals}}}\n\nProgram Description:`,
});

const generateProgramDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProgramDescriptionFlow',
    inputSchema: GenerateProgramDescriptionInputSchema,
    outputSchema: GenerateProgramDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
