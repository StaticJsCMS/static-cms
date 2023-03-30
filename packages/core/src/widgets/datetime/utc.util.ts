import addMinutes from 'date-fns/addMinutes';

export function localToUTC(dateTime: Date): Date {
  return addMinutes(dateTime.getTime(), getTimezoneOffset(dateTime));
}

export function utcToLocal(dateTime: Date): Date {
  return addMinutes(dateTime.getTime(), getTimezoneOffset(dateTime) * -1);
}

export function getTimezoneOffset(dateTime: Date): number {
  return dateTime.getTimezoneOffset();
}
