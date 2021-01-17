import React, { useEffect } from "react"
import { Layout, Menu, Row } from 'antd';
import { useHistory } from "react-router-dom"
import { SetUser } from "stores/action/User"
import { connect } from "react-redux"
import { LaptopOutlined, BookOutlined } from '@ant-design/icons';
import {
    Switch,
    Route,
    Link,
    Redirect,
    useLocation
} from "react-router-dom";
import { BuatKuis, ListKuis } from "./kuis"
import { BuatMateri, ListMateri } from "./materi"
import Pembelajaran from "./pembelajaran.js"
import Pendahuluan from "./pendahuluan"
import KiKd from "./ki-kd"
import Glosarium from "./glosarium"
import PetaKonsep from "./peta-konsep"
import DaftarPustaka from "./daftar-pustaka"
import Profile from "./Profile"
import PetunjukPenggunaan from "./Petunjuk-Penggunaan"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Dashboard = (props) => {
    const history = useHistory()
    const location = useLocation()
    const { SetUser, dataUser } = props

    useEffect(() => {
        if (!dataUser) {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Row justify="space-between">
                    <div className="logo" />
                    <Menu onClick={() => {
                        SetUser("")
                        history.push("/login")
                    }
                    } theme="dark" mode="horizontal">
                        <Menu.Item key="1">
                            {/* <Button> */}
                                Logout
                {/* </Button> */}
                        </Menu.Item>
                    </Menu>

                </Row>
            </Header>
            <Layout style={{ marginTop: 64 }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }} width={200} className="site-layout-background">
                    {/* <div className="logo" /> */}
                    <Menu
                        onClick={(info) => console.log(info)}
                        mode="inline"
                        defaultSelectedKeys={[location.pathname]}
                        // defaultOpenKeys={[location.pathname]}
                        style={{ height: '100vh', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<BookOutlined />} title="Materi">
                            <Menu.Item key="/buat-materi">
                                <Link to="/buat-materi">
                                    Buat Materi
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/list-materi">
                                <Link to="/list-materi">
                                    List Materi
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Kuis">
                            <Menu.Item key="/buat-kuis">
                                <Link to="/buat-kuis">
                                    Buat Kuis
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/list-kuis">
                                <Link to="/list-kuis">
                                    List Kuis
                                </Link>
                            </Menu.Item>
                            <Menu.Item icon={<LaptopOutlined />}>
                                <Link to="/penilaian">
                                    Penilaian
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<LaptopOutlined />} title="Pages">
                            <Menu.Item icon={<LaptopOutlined />}>
                                <Link to="/pembelajaran">
                                    List Pembelajaran
                                </Link>
                            </Menu.Item>
                            <Menu.Item icon={<LaptopOutlined />}>
                                <Link to="/pendahuluan">
                                    Pendahuluan
                                </Link>
                            </Menu.Item>
                            <Menu.Item icon={<LaptopOutlined />}>
                                <Link to="/ki-kd">
                                    KI /KD
                                </Link>
                            </Menu.Item>
                            <Menu.Item icon={<LaptopOutlined />}>
                                <Link to="/peta-konsep">
                                    Peta Konsep
                                </Link>
                            </Menu.Item>
                            <Menu.Item icon={<LaptopOutlined />}>
                                <Link to="/glosarium">
                                    Glosarium
                                </Link>
                            </Menu.Item>
                            <Menu.Item icon={<LaptopOutlined />}>
                                <Link to="/daftar-pustaka">
                                    Daftar Pustaka
                                </Link>
                            </Menu.Item>
                            <Menu.Item icon={<LaptopOutlined />}>
                                <Link to="/profile">
                                    Profile
                                </Link>
                            </Menu.Item>
                            <Menu.Item icon={<LaptopOutlined />}>
                                <Link to="/petunjuk-penggunaan">
                                    Petunjuk Penggunaan
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '24px 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Redirect exact from="/" to="/list-materi" />
                            <Route path="/buat-materi" key={"buat-materi"}>
                                <BuatMateri />
                            </Route>
                            <Route path="/list-materi" key={"list-materi"}>
                                <ListMateri />
                            </Route>
                            <Route path="/list-kuis" key={"list-kuis"}>
                                <ListKuis />
                            </Route>
                            <Route path="/buat-kuis" key={"buat-kuis"}>
                                <BuatKuis />
                            </Route>
                            <Route path="/pembelajaran" key={"pembelajaran"}>
                                <Pembelajaran />
                            </Route>
                            <Route path="/pendahuluan" key={"pendahuluan"}>
                                <Pendahuluan />
                            </Route>
                            <Route path="/ki-kd" key={"ki-kd"}>
                                <KiKd />
                            </Route>
                            <Route path="/peta-konsep" key={"peta-konsep"}>
                                <PetaKonsep />
                            </Route>
                            <Route path="/glosarium" key={"glosarium"}>
                                <Glosarium />
                            </Route>
                            <Route path="/daftar-pustaka" key={"daftar-pustaka"}>
                                <DaftarPustaka />
                            </Route>
                            <Route path="/profile" key={"profile"}>
                                <Profile />
                            </Route>
                            <Route path="/petunjuk-penggunaan" key={"petunjuk-penggunaan"}>
                                <PetunjukPenggunaan />
                            </Route>
                        </Switch>
                        {/* {JSON.stringify(location)} */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

const mapStateToProps = state => {
    const { User } = state;
    const { data } = User
    return {
        dataUser: data,
    };
}
const mapDispatchToProps = {
    SetUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);