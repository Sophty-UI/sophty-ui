import { DetailedHTMLProps, HTMLAttributes, ReactElement, ReactNode } from 'react';

import { IGridSpan } from '../../../../types/grid';

export interface IGridItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  columnEnd?: number;
  columnStart?: number;
  span?: number | IGridSpan;
}

const GridItem = ({ children, style, columnStart, columnEnd, span, ...props }: IGridItemProps): ReactElement => {
  if (typeof span !== 'number' || typeof columnStart !== 'number' || typeof columnEnd !== 'number') {
    throw new Error('Use Grid.Item only inside Grid container');
  }

  return (
    <div {...props} style={{ ...style, gridColumn: `${columnStart} / ${Math.min(columnStart + span, columnEnd + 1)}` }}>
      {children}
    </div>
  );
};

export default GridItem;
