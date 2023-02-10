import clsx from 'clsx';
import { FC, MouseEventHandler } from 'react';

import styles from './style.module.scss';

export interface ILogoEvents {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface ILogoProps extends ILogoEvents {
  alt?: string;
  className?: string;
  href?: string;
  name?: string;
  src?: string;
}

const Logo: FC<ILogoProps> = ({ className, alt, href = '/', src, name, ...events }) => (
  <div className={clsx(className, styles.logo)}>
    <a className={styles.link} href={href} onClick={events.onClick}>
      <img className={styles.image} src={src} alt={alt} />
      {!!name && <span className={styles.name}>{name}</span>}
    </a>
  </div>
);

export default Logo;
