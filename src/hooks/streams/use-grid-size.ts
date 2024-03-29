export function useGridSize(items: number, isDesktop: boolean = true) {
  const getColumns = () => {
    if (isDesktop) {
      if (items === 1) return 1;
      if (items >= 2 && items <= 6) return 2;
    } else {
      if (items <= 3) return 1;
      if (items >= 4 && items <= 6) return 2;
    }

    if (items >= 7 && items <= 12) return 3;
    if (items >= 13 && items <= 20) return 4;
    if (items >= 21 && items <= 30) return 6;
    if (items >= 31 && items <= 35) return 7;
    if (items >= 36 && items <= 45) return 8;

    return 9;
  };

  const columns = getColumns();

  const rows = Math.ceil(items / columns);

  return {
    rows,
    columns,
  };
}
