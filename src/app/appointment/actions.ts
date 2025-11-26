'use server';

import { z } from 'zod';
import { validateEmail } from '@/ai/flows/validate-email-with-llm';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const appointmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  appointmentDate: z.date(),
  appointmentType: z.enum(['volunteering', 'partnership', 'general']),
  message: z.string().max(500).optional(),
});

type FormState = {
  success: boolean;
  message: string;
  field?: string;
};

export async function bookAppointment(
  values: z.infer<typeof appointmentSchema>
): Promise<FormState> {
  const parsed = appointmentSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: 'Invalid form data.' };
  }

  const { email, name, appointmentDate, appointmentType, message } = parsed.data;

  try {
    // Use GenAI to validate email
    const emailValidation = await validateEmail({ email });

    if (!emailValidation.isValid) {
      return {
        success: false,
        message: emailValidation.reason || 'This email address appears to be invalid or from a disposable service. Please use a legitimate email.',
        field: 'email'
      };
    }

    // Save the appointment to Firestore
    if (!db) {
      console.error('Firestore not configured - cannot save appointment');
      return { success: false, message: 'Server error: database not configured.' };
    }

    await addDoc(collection(db, 'appointments'), {
      name,
      email,
      appointmentDate,
      appointmentType,
      message,
      createdAt: serverTimestamp(),
      status: 'pending',
    });

    console.log('Booking appointment for:', {
      name,
      email,
      appointmentDate,
      appointmentType,
      message,
    });
    
    return { success: true, message: 'Appointment requested successfully!' };

  } catch (error) {
    console.error('Error booking appointment:', error);
    return {
      success: false,
      message: 'An unexpected server error occurred. Please try again later.',
    };
  }
}
