import { z } from 'zod/v4';

export interface FormValues {
  text: string;
}

export const initialValues: FormValues = {
  text: '',
};

export const validationSchema = z.object({
  text: z.string().trim().min(1, 'Comment is required').max(255, 'Comment is too long'),
});
