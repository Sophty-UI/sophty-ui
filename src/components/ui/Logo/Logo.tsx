import clsx from 'clsx';
import { MouseEventHandler } from 'react';

import { IBaseProps } from '../../../types/base';
import styles from './style.module.scss';

export interface ILogoEvents {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface ILogoProps extends IBaseProps, ILogoEvents {
  alt?: string;
  href?: string;
  name?: string;
  src?: string;
}

const Logo = ({ className, alt, href = '/', src, name, ...events }: ILogoProps) => (
  <div className={clsx(className, styles.logo)}>
    <a className={styles.link} href={href} onClick={events.onClick}>
      <img className={styles.image} src={src} alt={alt} />
      {!!name && <span className={styles.name}>{name}</span>}
    </a>
  </div>
);

export default Logo;
