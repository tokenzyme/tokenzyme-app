import { z } from 'zod/v4';

export interface FormValues {
  slippage: number | null;
}

export const getInitialValues = (slippage?: number): FormValues => ({
  slippage: slippage ?? null,
});

export const validationSchema = z.object({
  slippage: z.number({ error: (issue) => (issue.input ? 'Invalid slippage' : 'Slippage is required') }).nonnegative(),
});

export type FormValuesOut = z.infer<typeof validationSchema>;
