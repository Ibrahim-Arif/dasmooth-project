import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useContext";
import { colors } from "../utilities/colors";

import "./dashboard.css";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const { setIsLogin } = useUser();
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Notifications", "2", <DesktopOutlined />),
    getItem("Profile Settings", "sub1", <UserOutlined />),
    getItem("Team Members", "team", <TeamOutlined />),
    getItem("Deleted Batons", "del", <FileOutlined />),
    getItem(
      "Logout",
      "logout",

      <LoginOutlined />
      // [<Link to="/" onClick={() => setIsLogin(false)}></Link>]
    ),
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ backgroundColor: colors.tealLight80 }}
      >
        <div className="logo" />
        <Menu
          theme="light"
          style={{
            color: colors.teal100,
            backgroundColor: colors.tealLight80,
            fontWeight: "bold",
          }}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        {/* <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            Bill is a cat.
          </div>
        </Content> */}

        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
}
