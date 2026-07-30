import { format } from 'date-fns/format';
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict';
import { enUS } from 'date-fns/locale';

import { fromDateTimeScalar } from './scalars';

export const DATE_DISPLAY_FORMAT = 'yyyy-MM-dd';
export const DATE_TIME_DISPLAY_FORMAT = 'yyyy-MM-dd HH:mm';

export const formatDateString = (dateStr: string, formatStr?: string): string =>
  format(fromDateTimeScalar(dateStr), formatStr ?? DATE_DISPLAY_FORMAT);

export const formatDateTimeString = (dateTimeStr: string, formatStr?: string): string =>
  format(fromDateTimeScalar(dateTimeStr), formatStr ?? DATE_TIME_DISPLAY_FORMAT);

export const formatDateTimeStringRelative = (dateTimeStr: string): string =>
  `${formatDistanceToNowStrict(fromDateTimeScalar(dateTimeStr), { locale: enUS, addSuffix: false })} ago`;
