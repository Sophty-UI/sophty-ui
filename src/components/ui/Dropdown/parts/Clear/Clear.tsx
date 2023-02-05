import { ReactElement } from 'react';

import styles from './style.module.scss';

const Clear = (): ReactElement => (
  <span aria-hidden="true" className={styles.clear}>
    x
  </span>
);

export default Clear;
