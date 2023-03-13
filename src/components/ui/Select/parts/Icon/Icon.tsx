import { FC } from 'react';

import ClearIcon from '../../../../icons/ClearIcon';
import SpinIcon from '../../../../icons/SpinIcon';
import SwitchArrowIcon from '../../../../icons/SwitchArrowIcon';
import styles from './style.module.scss';

export interface IIconEvents {
  onClear: () => void;
}

export interface IIconProps extends IIconEvents {
  allowClear: boolean;
  disabled: boolean;
  loading: boolean;
  open: boolean;
}

const Icon: FC<IIconProps> = ({ allowClear, open: isOpen, disabled: isDisabled, loading: isLoading, ...events }) => (
  <div className={styles.icon}>
    {isLoading ? (
      <SpinIcon disabled={isDisabled} />
    ) : (
      <>
        {allowClear ? (
          <ClearIcon onClear={events.onClear} disabled={isDisabled} />
        ) : (
          <SwitchArrowIcon status={isOpen} disabled={isDisabled} />
        )}
      </>
    )}
  </div>
);

export default Icon;
