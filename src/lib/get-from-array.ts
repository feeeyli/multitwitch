type Obj = { [key: string]: unknown };

export function getFromArray<T>(arr: Obj[], key: string, value: unknown) {
  return arr.find((item) => item[key] === value) as T | undefined;
}
