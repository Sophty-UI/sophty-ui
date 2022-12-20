import { ReactElement } from 'react';

import { Container, Grid, Layout } from '../components/layouts';

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
        <div style={{ backgroundColor: 'yellow' }}>main</div>
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
