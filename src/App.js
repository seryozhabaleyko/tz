import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Home from 'pages/Home';

import NotFound from 'components/NotFound';
import PrivateRoute from 'components/PrivateRoute';

import ProfileContainer from 'containers/ProfileContainer';

const { Header, Sider } = Layout;

function App() {

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              News
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Login
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />}>
              Profile
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">

          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>

          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/profile" component={ProfileContainer} />
            <Route component={NotFound} />
          </Switch>

        </Layout>
      </Layout>
    </Router>
  );
}

export default App;