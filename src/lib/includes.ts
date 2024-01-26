type Obj = { [key: string]: unknown };

export function includes(origin: Obj[], key: string, value: unknown) {
  return origin.some((o) => o[key] === value);
}
