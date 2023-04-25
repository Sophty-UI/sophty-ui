import clsx from 'clsx';
import { FC } from 'react';

import { IBox } from '~/types/box';

import styles from './style.scss';

export interface IBoxProps extends IBox {
  semantic?: 'div' | 'aside' | 'footer' | 'header' | 'main' | 'nav' | 'section';
  type?: 'box' | 'area';
}

const Box: FC<IBoxProps> = ({ children, className, semantic = 'div', type = 'box', ...props }) => {
  const Tag = `${semantic}` as typeof semantic;

  return (
    <Tag {...props} className={clsx(className, styles[type])}>
      {children}
    </Tag>
  );
};

export default Box;
