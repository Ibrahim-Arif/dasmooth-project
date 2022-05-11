import React, { useEffect, useState } from "react";
import { Layout, Menu, Input, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  TeamFilled,
  UserOutlined,
  LoginOutlined,
  SearchOutlined,
  RightOutlined,
  DeleteFilled,
  DeleteOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";

import { Container } from "react-bootstrap";
import { BrowserRouter, useNavigate, Routes, Route } from "react-router-dom";
import { useUser } from "../hooks/useContext";
import { colors } from "../utilities/colors";
import styledComponents from "styled-components";

import "./dashboard.css";
import DeleteBaton from "./DeleteBaton";

const { Header, Content, Footer, Sider } = Layout;
export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [renderSearchBar, setRenderSearchBar] = useState(false);
  const { setIsLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = "white";
  }, []);

  const onCollapse = (collapsed, type) => {
    console.log(collapsed, type);
    setCollapsed(collapsed);
  };

  const handleSearchBarShow = () => {
    if (window.innerWidth <= 768) {
      setRenderSearchBar(!renderSearchBar);
    }
  };

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  };
  const handleItemClick = ({ item, key, keyPath, domEvent }) => {
    console.log(key);
    switch (key) {
      case "logout":
        setIsLogin(false);
        navigate("/");
        break;
      case "delete":
        navigate("deleteBaton");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
    }
  };
  const items = [
    getItem("Dashboard", "dashboard", <PieChartOutlined />),
    getItem("Notifications", "notifications", <BellOutlined />),
    getItem("Profile Settings", "profile", <SettingOutlined />),
    getItem("Team Members", "team", <TeamOutlined />),
    getItem("Deleted Batons", "delete", <DeleteOutlined />),
    getItem(
      "Logout",
      "logout",

      <LoginOutlined />
    ),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <DashboardHeader
        bgColor={colors.teal100}
        className="d-flex flex-row align-items-center"
      >
        <Container className="col-8 col-lg-3 align-self-center">
          {!renderSearchBar && <h2>Logo</h2>}
          {renderSearchBar && (
            <SearchBar
              size="large"
              placeholder="Search by name, email or team member"
              prefix={<SearchOutlined />}
            />
          )}
        </Container>
        <Container className="col-2 col-md-1 col-lg-8 ">
          <Button
            shape="circle"
            className="d-inline-block d-lg-none"
            icon={!renderSearchBar ? <SearchOutlined /> : <RightOutlined />}
            size="large"
            color={colors.teal100}
            onClick={handleSearchBarShow}
          />

          <SearchBar
            className="d-none d-lg-flex w-50"
            size="large"
            placeholder="Search by name, email or team member"
            prefix={<SearchOutlined />}
          />
        </Container>
      </DashboardHeader>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="col-3"
          collapsible
          collapsed={collapsed}
          // collapsedWidth="0"
          onCollapse={onCollapse}
          style={{ backgroundColor: colors.tealLight80 }}
          // trigger={null}
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
        >
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
            onClick={handleItemClick}
          ></Menu>
        </Sider>
        <Routes>
          <Route path="/deleteBaton" element={<DeleteBaton />} />
        </Routes>
      </Layout>
    </div>
  );
}

const DashboardHeader = styledComponents(Header)`
  padding: 0px;
  background-color:${({ bgColor, ...props }) => bgColor};
`;

const SearchBar = styledComponents(Input)`
    border-radius: 50px;
`;
