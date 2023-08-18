import { ColumnType } from "./enums";
import { TColor } from "./interface";

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];

export function swap<T>(arr: T[], i: number, j: number): T[] {
  const copy = [...arr];
  const tmp = copy[i];
  copy[i] = copy[j];
  copy[j] = tmp;
  return copy;
}

export function pickChakraRandomColor(variant = '') {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color + variant;
}

export const ColumnColorScheme: Record<ColumnType, TColor> = {
  Task: { bg: '#FEF4F3', colorTitle: '#6E1E29', colorText: '#D4AFB4', colorBtn: '#D37A86' },
  Doing: { bg: '#FFFBF2', colorTitle: '#795B19', colorText: '#DECBA3', colorBtn: '#C2A25A' },
  Done: { bg: '#F4F9F3', colorTitle: '#286C1A', colorText: '#BBD6B6', colorBtn: '#286C1A' },
};