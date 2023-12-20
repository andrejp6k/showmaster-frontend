export function enumNumericValues<T extends { [s: string]: any }>(
  enumObject: T,
): number[] {
  return Object.values(enumObject).filter((x) => typeof x === 'number');
}
