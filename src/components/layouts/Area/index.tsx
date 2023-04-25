import { FC } from 'react';

import { ITrackBreadth } from '~/types/style';

import Box, { IBoxProps } from '../Box';

export interface IAreaProps extends Omit<IBoxProps, 'type'> {
  area: string;
  height?: ITrackBreadth | number;
  width?: ITrackBreadth | number;
}

const Area: FC<IAreaProps> = ({ area, height, width, children, style, ...props }) => (
  <Box {...props} type="area" style={{ ...style, gridArea: area, width, height }}>
    {children}
  </Box>
);

export default Area;
