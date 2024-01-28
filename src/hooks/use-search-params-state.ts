import { usePathname, useRouter, useSearchParams } from "next/navigation";

const cleanEmpty = (obj: { [x: string]: string }) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v != ""));

export function useSearchParamsState(
  searchParamName: string,
  defaultValue: string
): readonly [
  searchParamsState: string,
  setSearchParamsState: (newState: string) => void
] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const acquiredSearchParam = searchParams.get(searchParamName);
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  const setSearchParamsState = (newState: string) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {}
      ),
      { [searchParamName]: newState }
    );
    const newParams = new URLSearchParams(cleanEmpty(next));

    router.push(`${pathname}?${newParams.toString().replaceAll("%2F", "/")}`);
  };
  return [searchParamsState, setSearchParamsState];
}
