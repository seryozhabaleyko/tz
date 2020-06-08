import React, {Suspense, lazy, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {Layout, Menu, Spin} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import PrivateRoute from 'containers/PrivateRoute';

const NotFound = lazy(() => import('components/NotFound'));
const Home = lazy(() => import('pages/Home'));
const ProfileContainer = lazy(() => import('containers/ProfileContainer'));

const {Header, Sider} = Layout;

function App() {

    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Router>
            <Layout>

                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined/>}>
                            Home
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
                            News
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined/>}>
                            Login
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UploadOutlined/>}>
                            Profile
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout className="site-layout">

                    <Header className="site-layout-background" style={{padding: 0}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Header>

                    <Suspense fallback={<Spin/>}>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <PrivateRoute path="/profile" component={ProfileContainer}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Suspense>

                </Layout>
            </Layout>
        </Router>
    );
}

export default App;