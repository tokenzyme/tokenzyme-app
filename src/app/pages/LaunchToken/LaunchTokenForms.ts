import { z } from 'zod/v4';

export interface FormValues {
  logoBlob: Blob | null;
  name: string;
  symbol: string;
  description: string;
  websiteUrl?: string;
  xUrl?: string;
  telegramUrl?: string;
  discordUrl?: string;
  redditUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  buyAmount: number | null;
  receiveAmount: number | null;
}

export const initialValues: FormValues = {
  logoBlob: null,
  name: '',
  symbol: '',
  description: '',
  websiteUrl: '',
  xUrl: '',
  telegramUrl: '',
  discordUrl: '',
  redditUrl: '',
  facebookUrl: '',
  instagramUrl: '',
  buyAmount: null,
  receiveAmount: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getValidationSchema = (ethBalance: number) =>
  z.object({
    logoBlob: z.instanceof(Blob),
    name: z.string().trim().min(1, 'Name is required').max(20, 'Name is too long'),
    symbol: z.string().trim().min(1, 'Symbol is required').max(20, 'Symbol is too long'),
    description: z.string().trim().min(1, 'Description is required').max(255, 'Description is too long'),
    websiteUrl: z
      .string()
      .trim()
      .regex(/https:\/\/.+/, 'URL must start with https://')
      .max(100, 'URL is too long')
      .or(z.literal(''))
      .optional(),
    xUrl: z
      .string()
      .trim()
      .regex(/https:\/\/x.com\/.+/, 'URL must start with https://x.com/')
      .max(100, 'URL is too long')
      .or(z.literal(''))
      .optional(),
    telegramUrl: z
      .string()
      .trim()
      .regex(/https:\/\/t.me\/.+/, 'URL must start with https://t.me/')
      .max(100, 'URL is too long')
      .or(z.literal(''))
      .optional(),
    discordUrl: z
      .string()
      .trim()
      .regex(/https:\/\/discord.gg\/.+/, 'URL must start with https://discord.gg/')
      .max(100, 'URL is too long')
      .or(z.literal(''))
      .optional(),
    redditUrl: z
      .string()
      .trim()
      .regex(/https:\/\/reddit.com\/r\/.+/, 'URL must start with https://reddit.com/r/')
      .max(100, 'URL is too long')
      .or(z.literal(''))
      .optional(),
    facebookUrl: z
      .string()
      .trim()
      .regex(/https:\/\/facebook.com\/.+/, 'URL must start with https://facebook.com/')
      .max(100, 'URL is too long')
      .or(z.literal(''))
      .optional(),
    instagramUrl: z
      .string()
      .trim()
      .regex(/https:\/\/instagram.com\/.+/, 'URL must start with https://instagram.com/')
      .max(100, 'URL is too long')
      .or(z.literal(''))
      .optional(),
    buyAmount: z
      .number()
      .positive('Amount must be greater than 0')
      .nullable()
      .refine((value) => !value || value <= ethBalance, {
        message: 'Insufficient balance',
      }),
    receiveAmount: z.number().positive().nullable(),
  });

export type FormValuesOut = z.infer<ReturnType<typeof getValidationSchema>>;
