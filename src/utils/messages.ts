export const UNKNOWN_ERROR = 'unknown_error';

export const TRYING_TO_BUY_MORE_THAN_AVAILABLE_WARNING = 'trying_to_buy_more_than_available';

const WARNING_MESSAGES: Record<string, string> = {
  [TRYING_TO_BUY_MORE_THAN_AVAILABLE_WARNING]:
    "You're trying to buy more than what's available for sale. Only the required amount will be used, and the rest will be refunded to you.",
};

const ERROR_MESSAGES: Record<string, string> = {
  [UNKNOWN_ERROR]: 'An unknown error occurred. Please try again later!',
  email_or_password_do_not_match: 'Email or password do not match.',
};

export const getWarningMessage = (warningCode: string): string => WARNING_MESSAGES[warningCode] ?? '';

export const getErrorMessage = (errorCode: string): string =>
  ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES[UNKNOWN_ERROR] ?? '';
