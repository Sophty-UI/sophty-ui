import { ReactElement } from 'react';

import { Col, Container, Grid, Layout, Row } from '../components/layouts';

// eslint-disable-next-line max-lines-per-function
const App = (): ReactElement => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <Layout
      template={[
        ['header', 'header', 'header'],
        ['nav', 'main', 'main'],
        ['nav', 'footer', 'footer'],
      ]}
      gap={[8, 8]}
    >
      <Layout.Area key="header" height="auto" semantic="header">
        <Container style={{ backgroundColor: 'lime' }}>header</Container>
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
        </div>
      </Layout.Area>
      <Layout.Area key="footer" height="min-content" semantic="footer">
        <Grid style={{ backgroundColor: 'red' }}>
          <Grid.Item span={{ sm: 6, md: 6, lg: 8 }} style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>
            Col 8
          </Grid.Item>
          <Grid.Item span={{ sm: 6, md: 6, lg: 4 }} style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>
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

          <Grid.Item span={400} style={{ backgroundColor: 'lightgray', border: '1px solid gray' }}>
            Col 400
          </Grid.Item>
        </Grid>
      </Layout.Area>
    </Layout>
  </div>
);

export default App;
