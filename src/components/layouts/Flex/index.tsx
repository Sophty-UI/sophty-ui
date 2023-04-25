import { FC } from 'react';

import Col, { IColProps } from './parts/Col';
import Row, { IRowProps } from './parts/Row';

export type IFlexProps = {
  Col: FC<IColProps>;
  Row: FC<IRowProps>;
};

const Flex = { Row, Col };

export default Flex;
