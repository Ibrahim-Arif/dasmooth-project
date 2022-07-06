import React, { useEffect, useState } from "react";
import { Layout, Menu, Input, Button, Avatar } from "antd";
import { SearchOutlined, RightOutlined, BarsOutlined } from "@ant-design/icons";

import { Container } from "react-bootstrap";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import styledComponents from "styled-components";

import Notification from "./Notification";
import TeamMembers from "./TeamMembers";
import DeleteBaton from "./DeleteBaton";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import BatonsForm from "./BatonsForm";

import { useUser } from "../hooks/useContext";
import { colors } from "../utilities/colors";
import { menuItems } from "../utilities/MenuItems";

import { logo } from "../assets";
import { getAuth } from "firebase/auth";
import { useCheckSignIn } from "../hooks/useCheckSignIn";

const { Header, Sider } = Layout;

export default function DashboardMenu() {
  // useCheckSignIn();

  const [collapsed, setCollapsed] = useState(true);

  const [renderSearchBar, setRenderSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const {
    setIsLogin,
    isLogin,
    setBatonsData,
    photoURL,
    permanentData,
    notifications,
  } = useUser();

  const [siderW, setSiderW] = useState("200px");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.getElementById("body").style.backgroundColor = "white";
    navigate("main");
  }, []);

  useEffect(() => {
    if (search == "") {
      setBatonsData(permanentData);
    } else {
      let temp = [...permanentData];
      temp = temp.filter(
        (e) =>
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.memberName.toLowerCase().includes(search.toLowerCase())
      );
      setBatonsData(temp);
    }
  }, [search]);
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
        setBatonsData([]);
        getAuth().signOut();
        window.localStorage.clear();
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
    window.innerWidth < 768 && setCollapsed(true);
  };
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSiderW("100vw");
    } else {
      setSiderW("200px");
      setRenderSearchBar(false);
    }
  }, [window.innerWidth]);
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
        {/* Search bar mobile */}
        {!renderSearchBar && (
          <Container
            className="d-flex align-self-center justify-content-center justify-content-lg-start mx-0"
            style={{ width: 250 }}
          >
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
                <img src={logo} height="40px" />
              </div>
            </div>
          </Container>
        )}

        {/* Search Bar */}
        <Container className="d-flex justify-content-end justify-content-lg-start mx-0">
          {renderSearchBar && location.pathname == "/main" && (
            <SearchBar
              size="large"
              placeholder="Search by name, email or team member"
              prefix={<SearchOutlined />}
              className="normal-input"
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
            />
          )}
          {location.pathname == "/main" && (
            <>
              <Button
                shape="circle"
                className="d-inline-block d-lg-none ms-3 ms-lg-0"
                icon={!renderSearchBar ? <SearchOutlined /> : <RightOutlined />}
                size="large"
                color={colors.teal100}
                onClick={handleSearchBarShow}
              />
              <SearchBar
                className="normal-input d-none d-lg-flex w-50"
                size="large"
                placeholder="Search by name, email or team member"
                prefix={<SearchOutlined />}
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                }}
              />
            </>
          )}
        </Container>
      </DashboardHeader>

      {/* Layout Grid */}
      <Layout
        style={{
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Sider
          className="col-3"
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
          onCollapse={onCollapse}
          style={{ backgroundColor: colors.tealLight90 }}
          width={siderW}
        >
          <Container className="d-flex flex-column justify-content-center align-items-center p-4">
            {/* {console.log(isLogin.photoURL)} */}
            {photoURL == null || photoURL == "" ? (
              <Avatar style={{ backgroundColor: colors.teal100 }} size={70}>
                {isLogin.displayName != null
                  ? isLogin.displayName.substring(0, 2).toUpperCase()
                  : isLogin.email.substring(0, 2).toUpperCase()}
              </Avatar>
            ) : (
              <Avatar src={photoURL} size={70} />
            )}
            <label style={{ fontWeight: "bold" }} className="mt-3">
              {isLogin.displayName != null
                ? isLogin.displayName
                : isLogin.email}
            </label>
          </Container>

          <Menu
            theme="light"
            style={{
              color: colors.teal100,
              backgroundColor: colors.tealLight90,
              fontWeight: "bold",
            }}
            defaultSelectedKeys={["dashboard"]}
            mode="inline"
            items={menuItems(notifications.length)}
            onClick={handleItemClick}
          ></Menu>
        </Sider>
        {/* {console.log(notifications.length)} */}
        {/* Nested Routing */}
        <Routes>
          <Route path="/main" element={<Dashboard />} />
          <Route path="/batonsForm" element={<BatonsForm />} />
          <Route path="/batonsForm/:id" element={<BatonsForm />} />
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
