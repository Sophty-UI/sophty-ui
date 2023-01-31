import clsx from 'clsx';
import { ForwardedRef, forwardRef, ReactElement, ReactNode } from 'react';

import useResolution from '../../../hooks/useResolution';
import { IDetailedProps } from '../../../types/box';
import { Resolution } from '../../../types/resolution';
import { Col, Container, Row } from '../../layouts';
import Menu, { IMenuProps } from '../Menu/Menu';
import styles from './style.module.scss';

export interface IHeaderProps extends IDetailedProps<HTMLDivElement> {
  extra?: ReactNode;
  logo?: ReactNode;
  menu?: IMenuProps;
}

const LOGO_SPAN = { xs: 24, sm: 24, md: 6, lg: 6, xl: 4, sl: 4 };
const MENU_SPAN = { xs: 0, sm: 0, md: 18, lg: 18, xl: 20, sl: 20 };

const Header = (
  { className, logo, menu, extra, ...props }: IHeaderProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement<IHeaderProps> => {
  const resolution = useResolution();
  const isMobile = resolution === Resolution.Small || resolution === Resolution.ExtraSmall;

  return (
    <Container {...props} ref={ref} className={clsx(className, styles.header)}>
      <Row className={styles.container} align="center" justify="end">
        {(!!logo || !!extra) && (
          <Col span={LOGO_SPAN} grow={!isMobile}>
            <Row align="center" justify={isMobile ? 'space-between' : 'start'}>
              {!!logo && <Col grow>{logo}</Col>}
              {!!extra && isMobile && <Col>{extra}</Col>}
            </Row>
          </Col>
        )}
        {!!menu && (
          <Col className={styles.menu} span={MENU_SPAN} grow>
            <Menu {...menu} />
          </Col>
        )}
        {!!extra && !isMobile && <Col>{extra}</Col>}
      </Row>
    </Container>
  );
};

export default forwardRef<HTMLDivElement, IHeaderProps>(Header);
