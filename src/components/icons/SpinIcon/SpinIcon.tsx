import { LoadingIcon } from '@sophty-ui/icons';
import { FC } from 'react';

import Icon, { IIconProps } from '../Icon';

export interface ISpinIconProps extends IIconProps {}

const SpinIcon: FC<ISpinIconProps> = ({ ...props }) => (
  <Icon {...props}>
    <LoadingIcon spin />
  </Icon>
);

export default SpinIcon;
