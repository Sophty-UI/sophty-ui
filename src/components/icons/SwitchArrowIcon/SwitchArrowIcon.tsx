import { ArrowDownIcon, ArrowUpIcon } from '@sophty-ui/icons';
import { FC } from 'react';

import Icon, { IIconProps } from '../Icon';

export interface ISwitchArrowIconProps extends IIconProps {
  status?: boolean;
}

const SwitchArrowIcon: FC<ISwitchArrowIconProps> = ({ status, disabled }) => (
  <Icon disabled={disabled}>{status ? <ArrowUpIcon /> : <ArrowDownIcon />}</Icon>
);

export default SwitchArrowIcon;
