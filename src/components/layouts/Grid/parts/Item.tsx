import { FC, useMemo } from 'react';

import useSpan from '~/hooks/useSpan';
import { IBox } from '~/types/box';
import { ISpan } from '~/types/resolution';

export interface IItemProps extends IBox {
  col?: ISpan;
  row?: ISpan;
}

const Item: FC<IItemProps> = ({ children, style, col = 1, row = 1, ...props }) => {
  const rowSpan = useSpan(row);
  const colSpan = useSpan(col);
  const itemStyle = useMemo(
    () => ({ ...style, gridRow: `span ${rowSpan || 1}`, gridColumn: `span ${colSpan || 1}` }),
    [rowSpan, colSpan, style]
  );

  return (
    <div {...props} style={itemStyle}>
      {children}
    </div>
  );
};

export default Item;
