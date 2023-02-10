import { FC } from 'react';

import { IDetailedProps } from '../../../types/box';
import styles from './style.module.scss';

enum HeadingType {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

export interface ITitleProps extends IDetailedProps<HTMLHeadingElement> {
  level?: HeadingType;
}

const Title: FC<ITitleProps> = ({ level = HeadingType.H1, children, ...props }) => {
  const Tag = `h${Math.max(HeadingType.H1, Math.min(level, HeadingType.H6))}` as
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';

  return (
    <Tag {...props} className={styles.title}>
      {children}
    </Tag>
  );
};

export default Title;
