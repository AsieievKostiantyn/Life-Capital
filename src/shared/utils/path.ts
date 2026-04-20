// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getByPath = (obj: any, path: string) =>
  path.split('.').reduce((acc, key) => acc?.[key], obj);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setByPathImmutable = (obj: any, path: string, value: unknown) => {
  const keys = path.split('.');
  const clone = structuredClone(obj);

  let cursor = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    cursor[keys[i]] ??= {};
    cursor = cursor[keys[i]];
  }

  cursor[keys[keys.length - 1]] = value;
  return clone;
};
