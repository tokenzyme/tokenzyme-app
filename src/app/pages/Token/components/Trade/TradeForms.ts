import { z } from 'zod/v4';

export interface FormValues {
  isBuy: boolean;
  isSwitched: boolean;
  amountIn: number | null;
  amountOut: number | null;
  slippage: number;
}

export const initialValues: FormValues = {
  isBuy: true,
  isSwitched: false,
  amountIn: null,
  amountOut: null,
  slippage: 2,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getValidationSchema = (ethBalance: number, tokenBalance: number) =>
  z
    .object({
      isBuy: z.boolean(),
      isSwitched: z.boolean(),
      amountIn: z
        .number({ error: (issue) => (issue.input ? 'Invalid amount' : 'Amount is required') })
        .positive('Amount must be greater than 0'),
      amountOut: z
        .number({ error: (issue) => (issue.input ? 'Invalid amount' : 'Amount is required') })
        .positive('Amount must be greater than 0'),
      slippage: z.number(),
    })
    .check((ctx) => {
      const { isBuy, amountIn } = ctx.value;
      if ((isBuy && amountIn > ethBalance) || (!isBuy && amountIn > tokenBalance)) {
        ctx.issues.push({
          code: 'custom',
          message: 'Insufficient balance',
          path: ['amountIn'],
          input: ctx.value.amountIn,
        });
      }
    });

export type FormValuesOut = z.infer<ReturnType<typeof getValidationSchema>>;
