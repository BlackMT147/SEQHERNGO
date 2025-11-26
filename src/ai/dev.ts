import { config } from 'dotenv';
config();

import '@/ai/flows/validate-email-with-llm.ts';
import '@/ai/flows/generate-blog-ideas.ts';
import '@/ai/flows/auto-generate-program-descriptions.ts';