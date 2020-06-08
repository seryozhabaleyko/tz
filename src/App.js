import React, {Suspense, lazy, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Link,
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
const ProfileContainer = lazy(() => import('containers/ProfileContainer'));
const HomeContainer = lazy(() => import('pages/Home/HomeContainer'));
const NewsContainer = lazy(() => import('pages/News/NewsContainer'));
const LoginContainer = lazy(() => import('pages/Login/LoginContainer'));

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
                            <Link to="/">
                                Home
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
                            <Link to="/news">
                                News
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined/>}>
                            <Link to="/login">
                                Login
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UploadOutlined/>}>
                            <Link to="/profile">
                                Profile
                            </Link>
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
                            <Route exact path="/" component={HomeContainer}/>
                            <Route path="/news" component={NewsContainer}/>
                            <Route path="/login" component={LoginContainer}/>
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