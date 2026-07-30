import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';

const DATE_FORMAT = 'yyyy-MM-dd';

export const fromDateTimeScalar = (dateTimeStr: string): Date => parseISO(dateTimeStr);

export const toDateScalar = (date: Date): string => format(date, DATE_FORMAT);
