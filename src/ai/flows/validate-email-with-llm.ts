'use server';
/**
 * @fileOverview Validates an email address using an LLM against historical records.
 *
 * - validateEmail - A function that validates an email address.
 * - ValidateEmailInput - The input type for the validateEmail function.
 * - ValidateEmailOutput - The return type for the validateEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateEmailInputSchema = z.object({
  email: z.string().email().describe('The email address to validate.'),
});
export type ValidateEmailInput = z.infer<typeof ValidateEmailInputSchema>;

const ValidateEmailOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the email address is valid based on historical records.'),
  reason: z.string().optional().describe('The reason why the email address is invalid, if applicable.'),
});
export type ValidateEmailOutput = z.infer<typeof ValidateEmailOutputSchema>;

export async function validateEmail(input: ValidateEmailInput): Promise<ValidateEmailOutput> {
  return validateEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateEmailPrompt',
  input: {schema: ValidateEmailInputSchema},
  output: {schema: ValidateEmailOutputSchema},
  prompt: `You are an email validator. You are given an email address and you need to determine if it is a legitimate email address based on historical records.

  Email: {{{email}}}

  Respond with a JSON object that indicates whether the email address is valid and provide a reason if it is not.
  The JSON object should conform to the following schema:
  {
    "isValid": boolean,
    "reason": string (optional)
  }`,
});

const validateEmailFlow = ai.defineFlow(
  {
    name: 'validateEmailFlow',
    inputSchema: ValidateEmailInputSchema,
    outputSchema: ValidateEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
