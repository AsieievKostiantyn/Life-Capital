export const toCamel = (str: string): string =>
  str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapSnakeToCamel = (input: any): any => {
  if (Array.isArray(input)) {
    return input.map(mapSnakeToCamel);
  }

  if (input !== null && typeof input === 'object') {
    return Object.entries(input).reduce(
      (acc, [key, value]) => {
        const camelKey = toCamel(key);
        acc[camelKey] = mapSnakeToCamel(value);
        return acc;
      },
      {} as Record<string, unknown>
    );
  }

  return input;
};
