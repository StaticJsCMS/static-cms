export function localToUTC(dateTime: Date, timezoneOffset: number): Date {
  const utcFromLocal = new Date(dateTime.getTime() - timezoneOffset);
  return utcFromLocal;
}

export function utcToLocal(dateTime: Date, timezoneOffset: number): Date {
  return new Date(dateTime.getTime() + timezoneOffset);
}

export function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset() * 60000;
}
