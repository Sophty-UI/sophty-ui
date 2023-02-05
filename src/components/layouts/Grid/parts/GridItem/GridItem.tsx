import { ReactElement } from 'react';

import { IBoxProps } from '../../../../../types/box';
import { IFlexSpan } from '../../../../../types/flex';

export interface IGridItemProps extends IBoxProps {
  columnEnd?: number;
  columnStart?: number;
  span?: IFlexSpan;
}

const GridItem = ({
  children,
  style,
  columnStart,
  columnEnd,
  span,
  ...props
}: IGridItemProps): ReactElement<IGridItemProps> => {
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