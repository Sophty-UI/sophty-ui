import { Key, ReactElement } from 'react';

import { IBoxProps } from '../../../../types/box';
import { ITrackBreadth } from '../../../../types/css';

export interface IAreaProps extends IBoxProps {
  area?: Key;
  height?: ITrackBreadth | number;
  key: string;
  semantic?: 'div' | 'aside' | 'footer' | 'header' | 'main' | 'nav' | 'section';
  width?: ITrackBreadth | number;
}

const Area = ({
  area,
  height,
  width,
  children,
  style = {},
  semantic = 'div',
  ...props
}: IAreaProps): ReactElement<IAreaProps> => {
  const Tag = `${semantic}` as typeof semantic;

  return (
    <Tag
      {...props}
      style={{
        ...style,
        gridArea: area,
        display: 'inline-grid',
        width: typeof width === 'number' ? width : undefined,
        height: typeof height === 'number' ? height : undefined,
      }}
    >
      {children}
    </Tag>
  );
};

export default Area;
