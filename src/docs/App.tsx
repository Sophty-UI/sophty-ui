import { ReactElement } from 'react';

import { Area, Container, Layout } from '../components/layouts';

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
      <Area key="header" height="auto" semantic="header">
        <Container style={{ backgroundColor: 'lime' }}>header</Container>
      </Area>
      <Area key="nav" width={200} semantic="nav">
        <div style={{ backgroundColor: 'lightblue' }}>nav</div>
      </Area>
      <Area key="main" height="1fr" semantic="main">
        <div style={{ backgroundColor: 'yellow' }}>main</div>
      </Area>
      <Area key="footer" height="min-content" semantic="footer">
        <div style={{ backgroundColor: 'red' }}>foot</div>
      </Area>
    </Layout>
  </div>
);

export default App;
