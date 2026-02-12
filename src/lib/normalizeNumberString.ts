export function normalizeNumberString(input: string): string {
  return input.replace(/[$.,'\s]/g, "");
}
