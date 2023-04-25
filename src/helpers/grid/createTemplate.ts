import { ITrackBreadth } from '~/types/style';

const minmax = (list: ITrackBreadth[]): string => (list.length > 1 ? `minmax(${list.join(', ')})` : list[0] ?? 'auto');
const createTemplate = (options: {
  cols: Map<string, ITrackBreadth>;
  rows: Map<string, ITrackBreadth>;
  template: string[][];
}): string => {
  const colWidths = new Map<number, Set<ITrackBreadth>>();
  const [rowsTemplate, colsCount] = options.template.reduce(
    ([template, length], row) => {
      const rowHeights = row.reduce<ITrackBreadth[]>((acc, key, colIndex) => {
        const height = options.rows.get(key);
        const widths = options.cols.get(key);

        if (height && !acc.includes(height)) acc.push(height);
        if (widths) colWidths.set(colIndex, (colWidths.get(colIndex) ?? new Set()).add(widths));

        return acc;
      }, []);

      return [`${template} \n "${row.join(' ')}" ${minmax(rowHeights)}`, Math.max(length, row.length)];
    },
    ['', 0] as [string, number]
  );

  return [
    rowsTemplate,
    [...new Array(colsCount)].reduce<string>(
      (acc, _, index) => `${acc} ${minmax([...(colWidths.get(index)?.values() ?? [])])}`,
      ''
    ),
  ].join(' / ');
};

export default createTemplate;
