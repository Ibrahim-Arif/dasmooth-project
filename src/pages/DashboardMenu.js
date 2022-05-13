import React, { useEffect, useState } from "react";
import { Layout, Menu, Input, Button, Avatar } from "antd";
import { SearchOutlined, RightOutlined, BarsOutlined } from "@ant-design/icons";

import { Container } from "react-bootstrap";
import { useNavigate, Routes, Route } from "react-router-dom";
import styledComponents from "styled-components";

import Notification from "./Notification";
import TeamMembers from "./TeamMembers";
import DeleteBaton from "./DeleteBaton";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

import { useUser } from "../hooks/useContext";
import { colors } from "../utilities/colors";
import { menuItems } from "../utilities/MenuItems";

import "./dashboard.css";

const { Header, Sider } = Layout;

export default function DashboardMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const [renderSearchBar, setRenderSearchBar] = useState(false);
  const { setIsLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = "white";
    navigate("main");
  }, []);

  const onCollapse = (collapsed, type) => {
    // console.log(collapsed, type);
    setCollapsed(collapsed);
  };

  const handleSearchBarShow = () => {
    if (window.innerWidth <= 768) {
      setRenderSearchBar(!renderSearchBar);
    }
  };

  const handleItemClick = ({ key }) => {
    // console.log(key);
    switch (key) {
      case "logout":
        setIsLogin(false);
        navigate("/");
        break;
      case "delete":
        navigate("deleteBaton");
        break;
      case "dashboard":
        navigate("main");
        break;
      case "notifications":
        navigate("notifications");
        break;
      case "profile":
        navigate("profileSettings");
        break;
      case "team":
        navigate("teamMembers");
        break;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <DashboardHeader
        bgcolor={colors.teal100}
        className="d-flex flex-row align-items-center"
      >
        <Container className="col-8 col-lg-3 align-self-center">
          {!renderSearchBar && (
            <div className="d-flex flex-row align-items-center">
              <Button
                style={{ backgroundColor: colors.teal100, color: "white" }}
                size="large"
                shape="circle"
                icon={<BarsOutlined />}
                className="d-block d-lg-none"
                onClick={() => setCollapsed(!collapsed)}
              ></Button>

              <div className="ms-3">
                <h3>Logo</h3>
              </div>
            </div>
          )}
          {renderSearchBar && (
            <SearchBar
              size="large"
              placeholder="Search by name, email or team member"
              prefix={<SearchOutlined />}
            />
          )}
        </Container>

        {/* Search Bar */}
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

      {/* Layout Grid */}
      <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
        <Sider
          className="col-3"
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
          onCollapse={onCollapse}
          style={{ backgroundColor: colors.tealLight80 }}
        >
          <Container className="d-flex flex-column justify-content-center align-items-center p-4">
            <Avatar src="https://joeschmoe.io/api/v1/random" size={70} />
            <h5 className="mt-3">UserName</h5>
          </Container>

          <Menu
            theme="light"
            style={{
              color: colors.teal100,
              backgroundColor: colors.tealLight80,
              fontWeight: "bold",
            }}
            defaultSelectedKeys={["dashboard"]}
            mode="inline"
            items={menuItems}
            onClick={handleItemClick}
          ></Menu>
        </Sider>

        {/* Nested Routing */}
        <Routes>
          <Route path="/main" element={<Dashboard />} />
          <Route path="/deleteBaton" element={<DeleteBaton />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/teamMembers" element={<TeamMembers />} />
          <Route path="/profileSettings" element={<Profile />} />
        </Routes>
      </Layout>
    </div>
  );
}

const DashboardHeader = styledComponents(Header)`
  padding: 0px;
  background-color:${({ bgcolor, ...props }) => bgcolor};
`;

const SearchBar = styledComponents(Input)`
    border-radius: 50px;
`;
