import React from "react"
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import { BuatKuis, ListKuis } from "./kuis"
import { BuatMateri, ListMateri } from "./materi"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function Dashboard() {
    return (
        <Layout>
            <Header style={{ padding: 0 }}>
                <div className="logo" />
            </Header>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }} width={200} className="site-layout-background">
                    <Menu
                        onClick={(info) => console.log(info)}
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100vh', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Materi">
                            <Menu.Item key="1">

                                <Link to="/buat-materi">
                                    Buat Materi
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/list-materi">
                                    List Materi
                                </Link>
                            </Menu.Item>
                            {/* <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item> */}
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Kuis">
                            <Menu.Item key="5">
                                <Link to="/buat-kuis">
                                    Buat Kuis
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/list-kuis">
                                    List Kuis
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        {/* <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu> */}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path="/buat-materi">
                                <BuatMateri />
                            </Route>
                            <Route path="/list-materi">
                                <ListMateri />
                            </Route>
                            <Route path="/list-kuis">
                                <ListKuis />
                            </Route>
                            <Route path="/buat-kuis">
                                <BuatKuis />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}