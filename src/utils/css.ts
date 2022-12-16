import { CSSDataType } from '../typings/css';

const DEFAULT_TRACK_SIZE = 'auto';

export function getGridTemplateTrackSize(track: CSSDataType.TrackBreadth[]): string {
  return track.length > 1 ? `minmax(${track.join(', ')})` : track[0] ?? DEFAULT_TRACK_SIZE;
}

export function getGridTemplate<Key = string>({
  template,
  rows,
  cols,
}: {
  cols: Map<Key, CSSDataType.TrackBreadth>;
  rows: Map<Key, CSSDataType.TrackBreadth>;
  template: Key[][];
}): string {
  const widths = new Map<number, Set<CSSDataType.TrackBreadth>>();
  let heights: CSSDataType.TrackBreadth[];
  let colsCount = 0;

  return [
    template.reduce((rowsAccumulator, row) => {
      colsCount = Math.max(colsCount, row.length);
      heights = row.reduce<CSSDataType.TrackBreadth[]>((rowHeightsAccumulator, area, colIndex) => {
        const areaHeight = rows.get(area);
        const areaWidths = cols.get(area);

        if (areaHeight && !rowHeightsAccumulator.includes(areaHeight)) rowHeightsAccumulator.push(areaHeight);
        if (areaWidths) widths.set(colIndex, (widths.get(colIndex) ?? new Set()).add(areaWidths ?? DEFAULT_TRACK_SIZE));

        return rowHeightsAccumulator;
      }, []);

      return [rowsAccumulator, `"${row.join(' ')}" ${getGridTemplateTrackSize(heights)}`].join('\n');
    }, ''),
    [...new Array(colsCount)].reduce(
      (acc, _, index) => [acc, getGridTemplateTrackSize([...(widths.get(index)?.values() ?? [])])].join(' '),
      ''
    ),
  ].join(' / ');
}
