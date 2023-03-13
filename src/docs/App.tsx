import logo from '/images/logo.svg';
import { CrossIcon } from '@sophty-ui/icons';
import { ReactElement, useEffect, useState } from 'react';

import { Col, Grid, Layout, Row } from '../components/layouts';
import { Header } from '../components/structures';
import { Logo, Select } from '../components/ui';
import { ResizeObserver } from '../components/utilities';

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

// -------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const items222: [string, string, string][] = new Array(1000)
  .fill(undefined)
  .map((_, index) => [`key${index}`, `value${index}`, `${index + 1} menu item`]);

// eslint-disable-next-line max-lines-per-function
const App = (): ReactElement => {
  const [show, setShow] = useState(true);

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
      </Layout.Area>
      <Layout.Area key="nav" width={200} semantic="nav">
        <div style={{ backgroundColor: 'lightblue' }}>nav</div>
      </Layout.Area>
      <Layout.Area key="main" height="1fr" semantic="main">
        <div
          style={{
            padding: 20,
            width: 400,
            height: 300,
          }}
        >
          <div style={{ padding: 12 }}>
            <Select placeholder="Placeholder text" loading>
              {items222.map(([key, value, label]) => (
                <Select.Option key={key} value={value} label={label} />
              ))}
            </Select>
          </div>

          <div style={{ padding: 12 }}>
            <Select placeholder="Placeholder text" allowClear disabled>
              {items222.map(([key, value, label]) => (
                <Select.Option key={key} value={value} label={label} />
              ))}
            </Select>
          </div>

          <div style={{ padding: 12 }}>
            <Select allowClear>
              {items222.map(([key, value, label]) => (
                <Select.Option key={key} value={value} label={label} />
              ))}
            </Select>
          </div>

          <div style={{ padding: 12 }}>
            <Select
              placeholder="Select item"
              editable
              allowClear
              onChange={(value, label) => console.log(`Change: ${value}, ${label}`)}
              onFocus={focus => console.log(`Focus: ${focus}`)}
              onFilter={searchString => console.log(`Search: ${searchString}`)}
            >
              <Select.Option key="O1" value="1" label="O1 menu item">
                <Row justify={'start'} gap={8}>
                  <Col style={{ width: 'fit-content', alignItems: 'center', display: 'flex' }}>
                    <div
                      style={{
                        background: 'rgba(0,0,0,0.2)',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CrossIcon />
                    </div>
                  </Col>
                  <Col span={12} grow>
                    O1 menu item
                  </Col>
                </Row>
              </Select.Option>
              <Select.Option key="O2" value="2" label="O2 menu item" />

              <Select.Group key="G1" title="Group 1">
                <Select.Option key="G1.O1" value="g1.1" label="G1.O1 menu item" />
                <Select.Option key="G1.O2" value="g1.2" label="G1.O2 menu item" />
                <Select.Option key="G1.O3" value="g1.3" label="G1.O3 menu item" disabled />
                <Select.Option key="G1.O4" value="g1.4" label="G1.O4 menu item" disabled />
              </Select.Group>

              <Select.Group key="G2" title="Group 2" disabled>
                <Select.Option key="G2.O1" value="g2.1" label="G2.O1 menu item" />
                <Select.Option key="G2.O2" value="g2.2" label="G2.O2 menu item" />
                <Select.Option key="G2.O3" value="g2.3" label="G2.O3 menu item" />
                <Select.Option key="G2.O4" value="g2.4" label="G2.O4 menu item" />

                <Select.Group key="G2.SG1" title="Group 2.5">
                  <Select.Option key="G2.SG1.O1" value="g2.1.1" label="G2.SG1.O1 menu item" />
                  <Select.Option key="G2.SG1.O2" value="g2.2.1" label="G2.SG1.O2 menu item" />
                  <Select.Option key="G2.SG1.O3" value="g2.3.1" label="G2.SG1.O3 menu item" />
                  <Select.Option key="G2.SG1.O4" value="g2.4.1" label="G2.SG1.O4 menu item" />
                </Select.Group>
              </Select.Group>

              <Select.Option key="O4" value="4" label="O4 menu item" />
              <Select.Option
                key="O5"
                value="5"
                label="O5 Extra large menu item text with super duper mega large description"
              />
            </Select>
          </div>
        </div>
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
              <ResizeObserver>
                <div>123</div>
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
