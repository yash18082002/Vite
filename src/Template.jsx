import React, { Component } from "react";
import './App.css';
import { Layout, Menu } from "antd";
import { connect } from 'react-redux';
import { TrophyTwoTone } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { selectUsername, logout } from "./features/user/userSlice";

const { Header, Footer, Content } = Layout;

class Template extends Component {
    constructor(props) {
        super(props);
    }

    // handleLogout(e) {
    //     e.preventDefault();
    //     this.props.logout();
    // }

    render() {
        const { username } = this.props;
        return <>
            <Layout className="layout" style={{ minWidth: '100vh', minHeight: '100vh' }}>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="demo-logo">
                        <TrophyTwoTone twoToneColor='#ffffff' />
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        // defaultSelectedKeys={['home']}
                    >
                        <Menu.Item key='home'><a href="/">Home</a></Menu.Item>
                        {!username && <Menu.Item key='login'><a href="/login">Login</a></Menu.Item>}
                        {!username && <Menu.Item key='signup'><a href="/signup">Sign Up</a></Menu.Item>}
                        {username && <Menu.Item key='logout'><a onClick={this.props.logout}>Log Out</a></Menu.Item>}
                    </Menu>
                </Header>
                <Content style={{ padding: '50px 50px' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </>
    }
}

const mapStateToProps = (state) => ({
    username: selectUsername(state)
});

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);