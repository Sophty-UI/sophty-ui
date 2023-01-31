import { ReactElement, useEffect, useState } from 'react';

import { Col, Grid, Layout, Row } from '../components/layouts';
import { Header, Menu } from '../components/structures';
import { Logo } from '../components/ui';
import { ResizeObserver } from '../components/utilities';
import OverflowObserver from '../components/utilities/OverflowObserver/OverflowObserver';
import { INodeRenderProps } from '../components/utilities/OverflowObserver/parts/Node';
import logo from './public/images/logo.svg';

import '../theme/assets/preflight.css';
import '@sophty-ui/icons/theme.css';

const MENU = [
  {
    id: 'development',
    label: 'Development',
  },
  {
    id: 'components',
    label: 'Components',
  },
  {
    id: 'test1',
    label: 'test 1',
  },
  {
    id: 'test2',
    label: 'test 2',
    disabled: true,
  },
  {
    id: 'test3',
    label: 'test 3',
  },
  {
    id: 'test31',
    label: 'test 31',
  },
  {
    id: 'test32',
    label: 'test 32',
  },
  {
    id: 'test33',
    label: 'test 33',
  },
  {
    id: 'test34',
    label: 'test 34',
  },
  {
    id: 'test35',
    label: 'test 35',
  },
  {
    id: 'test36',
    label: 'test 36',
  },
];

interface IItemType {
  id: number;
  label: string;
  value: string | number;
}

function createData(count: number): IItemType[] {
  const data: IItemType[] = new Array(count).fill(undefined).map((_, index) => ({
    id: index,
    value: index,
    label: `Label ${index}`,
  }));

  return data;
}

function renderItem(item: IItemType): ReactElement {
  return (
    <div
      style={{
        margin: '0 16px 0 8px',
        padding: '4px 8px',
        background: 'rgba(255, 0, 0, 0.2)',
      }}
    >
      {item.label}
    </div>
  );
}

// eslint-disable-next-line max-lines-per-function, @typescript-eslint/explicit-function-return-type
const Demo = () => {
  const [data, setData] = useState(createData(200));

  return (
    <div style={{ padding: 32 }}>
      <select
        style={{ width: 300, height: 32 }}
        value={data.length}
        onChange={({ target: { value } }) => {
          setData(createData(Number(value)));
        }}
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={200}>200</option>
      </select>

      <div
        style={{
          border: '5px solid green',
          padding: 8,
          maxWidth: 300,
          marginTop: 4,
        }}
      >
        <OverflowObserver nodes={data} render={renderItem} getKey={item => item.id} />
      </div>
    </div>
  );
};

// -------------------------------------------------------------

// eslint-disable-next-line max-lines-per-function
const App = (): ReactElement => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async (): Promise<void> => setShow((await document.fonts.ready).status === 'loaded'))();
  }, []);

  const Page = (
    <Layout
      template={[
        ['header', 'header'],
        ['nav', 'main'],
      ]}
      gap={[8, 8]}
    >
      <Layout.Area key="header" height="auto" semantic="header">
        <Header logo={<Logo src={logo} alt="logo" name="Sophty UI" />} menu={{ items: MENU }} extra={<div>111</div>} />
        <Demo />
      </Layout.Area>
      <Layout.Area key="nav" width={200} semantic="nav">
        <div style={{ backgroundColor: 'lightblue' }}>nav</div>
      </Layout.Area>
      <Layout.Area key="main" height="1fr" semantic="main">
        <div style={{ backgroundColor: 'yellow' }}>
          <Row gap={[8, 8]} align="center" justify="center">
            <Col flex={4} style={{ backgroundColor: '#1677ffbf', padding: 8, color: 'white' }}>
              4/10
            </Col>
            <Col flex={6} style={{ backgroundColor: '#1677ff', padding: 8, color: 'white' }}>
              6/10
            </Col>
          </Row>
          <Row gap={[8, 8]} align="center" justify="center" wrap="nowrap">
            <Col flex="1 1 200px" style={{ backgroundColor: '#1677ffbf', padding: 8, color: 'white' }}>
              1 1 200px
            </Col>

            <Col flex="0 1 300px" style={{ backgroundColor: '#1677ff', padding: 8, color: 'white' }}>
              0 1 300px
            </Col>
          </Row>
          <Row gap={[8, 8]} align="center" justify="center">
            <Col flex={4}>FLEX COL auto</Col>
            <Col span={4}>FLEX COL 4</Col>
            <Col span={4}>FLEX COL 4</Col>
            <Col span={8}>FLEX COL 8</Col>
            <Col span={8} style={{ backgroundColor: 'white' }}>
              FLEX COL 8
            </Col>
          </Row>

          <Grid style={{ backgroundColor: 'red' }}>
            <Grid.Item
              span={{ sm: 6, md: 6, lg: 8 }}
              style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}
            >
              Col 8
            </Grid.Item>
            <Grid.Item
              span={{ sm: 6, md: 6, lg: 4 }}
              style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}
            >
              Col 4
            </Grid.Item>

            <Grid.Item span={2} style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>
              Col 2
            </Grid.Item>
            <Grid.Item span={6} style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>
              Col 6
            </Grid.Item>
            <Grid.Item span={2} style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>
              Col 2
            </Grid.Item>
            <Grid.Item span={1} style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>
              Col 1
            </Grid.Item>
            <Grid.Item span={1} style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>
              Col 1
            </Grid.Item>

            <Grid.Item style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>Col 12 auto</Grid.Item>

            <Grid.Item span={6} style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>
              Col 6
            </Grid.Item>
            <Grid.Item style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>Col 6 auto</Grid.Item>
            <Grid.Item style={{ backgroundColor: 'ButtonFace', border: '1px solid gray' }}>
              <ResizeObserver onResize={(a, b) => console.log('333', a.height, a.width, '444', b)}>
                <div ref={() => console.log('3')}>123</div>
              </ResizeObserver>
            </Grid.Item>
          </Grid>
        </div>
      </Layout.Area>
    </Layout>
  );

  return <>{show && Page}</>;
};

export default App;
