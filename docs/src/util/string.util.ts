import { isNotNullish, isNullish } from './null.util';

export function isEmpty(value: string | null | undefined): value is null | undefined {
  return isNullish(value) || value === '';
}

export function isNotEmpty(value: string | null | undefined): value is string {
  return isNotNullish(value) && value !== '';
}

export function toTitleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toTitleCaseFromKey(str: string) {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, toTitleCase);
}

export function toTitleCaseFromVariableName(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join(' ')
    .replace(/\w\S*/g, toTitleCase);
}
