import { CrossIcon } from '@sophty-ui/icons';
import { MouseEvent, ReactElement } from 'react';

import { preventEvent } from '../../../utils/events';
import Icon, { IIconProps } from '../Icon';
import styles from './style.module.scss';

export interface IClearIconEvents {
  onClear: () => void;
}

export interface IClearIconProps extends IIconProps, IClearIconEvents {}

const ClearIcon = ({ disabled, ...events }: IClearIconProps): ReactElement => {
  const handleClear = (event: MouseEvent): void => {
    if (!disabled) events.onClear();
    preventEvent(event);
  };

  return (
    <Icon disabled={disabled}>
      <CrossIcon className={styles.icon} onClick={handleClear} onMouseDown={preventEvent} onMouseUp={preventEvent} />
    </Icon>
  );
};

export default ClearIcon;
