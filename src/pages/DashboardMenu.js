import React, { useEffect, useState } from "react";
import { Layout, Menu, Input, Button, Avatar } from "antd";
import {
  SearchOutlined,
  RightOutlined,
  BarsOutlined,
  EditFilled,
} from "@ant-design/icons";
import { Badge } from "antd";
import { Container } from "react-bootstrap";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import styledComponents from "styled-components";
import { HiPencil } from "react-icons/hi";
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
  const sideBarBgColor = "#f2f9f8";

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
  const [selectedKey, setSelectedKey] = useState("dashboard");
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
    setSelectedKey(key);
    switch (key) {
      case "logout":
        // setSelectedKey("logout");
        setBatonsData([]);
        getAuth().signOut();
        window.localStorage.clear();
        setIsLogin(false);
        navigate("/");
        break;
      case "delete":
        // setSelectedKey("delete");
        navigate("deleteBaton");
        break;
      case "dashboard":
        // setSelectedKey("dasboard");
        navigate("main");
        break;
      case "notifications":
        // setSelectedKey("notifications");
        navigate("notifications");
        break;
      case "profile":
        // setSelectedKey("profile");
        navigate("profileSettings");
        break;
      case "team":
        // setSelectedKey("team");
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

  useEffect(() => {
    if (location.pathname == "/profileSettings") {
      setSelectedKey("profile");
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <DashboardHeader
        bgcolor={colors.teal100}
        className="d-flex flex-row"
        style={{ height: "fit-content" }}
      >
        {/* Search bar mobile */}
        {!renderSearchBar && (
          <Container
            className="col-2 d-flex justify-content-center justify-content-lg-start mx-0 px-0"
            style={{ width: "fit-content" }}
          >
            <div className="d-flex flex-row align-items-center">
              <Button
                style={{ backgroundColor: colors.teal100, color: "white" }}
                size="large"
                shape="circle"
                icon={<BarsOutlined />}
                className="d-block d-lg-none ms-3"
                onClick={() => setCollapsed(!collapsed)}
              ></Button>

              <img
                src={logo}
                height="40px"
                style={{
                  marginLeft: "40px",
                  marginRight: "70px",
                  marginTop: "22px",
                  marginBottom: "22px",
                }}
              />
            </div>
          </Container>
        )}

        {/* Search Bar */}
        <Container
          className={
            renderSearchBar
              ? `col-12 d-flex align-items-center justify-content-center mx-auto px-0 my-3`
              : `col-lg-9 d-flex align-items-center justify-content-end justify-content-lg-start mx-0 px-0 my-3`
          }
          style={{ height: "84px" }}
        >
          {/* && location.pathname == "/main" */}
          {renderSearchBar && (
            <>
              <SearchBar
                size="large"
                id="searchBar"
                placeholder="Search by name, email or team member"
                prefix={
                  <SearchOutlined
                    style={{
                      fontSize: "24px",
                      color: "#5f6b72",
                      marginLeft: "12px",
                      marginRight: "8px",
                    }}
                  />
                }
                className="mx-1"
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                }}
                onFocus={() => {
                  if (location.pathname != "/main") {
                    setSelectedKey("dashboard");
                    // console.log(selectedKey, location.pathname);
                    navigate("/main");
                  }
                }}
              />
            </>
          )}

          <Button
            shape="circle"
            className="d-inline-block d-lg-none mx-3 ms-lg-0"
            icon={!renderSearchBar ? <SearchOutlined /> : <RightOutlined />}
            size="large"
            color={colors.teal100}
            onClick={handleSearchBarShow}
          />

          {/* {location.pathname == "/main" && (
          )} */}

          {/* Desktop Search Bar */}
          <>
            <SearchBar
              className="d-none d-lg-flex w-50"
              id="searchBar"
              size="large"
              placeholder="Search by name, email or team member"
              prefix={
                <SearchOutlined
                  style={{
                    fontSize: "24px",
                    color: "#5f6b72",
                    marginLeft: "12px",
                    marginRight: "8px",
                  }}
                />
              }
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
              onFocus={() => {
                if (location.pathname != "/main") {
                  setSelectedKey("dashboard");

                  navigate("/main");
                }
              }}
            />
          </>
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
          style={{
            //  backgroundColor: colors.tealLight90
            backgroundColor: sideBarBgColor,
          }}
          width={200}
        >
          <Container className="d-flex flex-column justify-content-center align-items-center p-4">
            {/* {console.log(isLogin.photoURL)} */}
            {/* [2022-07-07] if we do not have a photoURL then we show the name initials */}
            {photoURL == null || photoURL == "" ? (
              <Avatar style={{ backgroundColor: colors.teal100 }} size={64}>
                {isLogin.displayName != null
                  ? isLogin.displayName.substring(0, 2).toUpperCase()
                  : isLogin.email.substring(0, 2).toUpperCase()}
              </Avatar>
            ) : (
              <div style={{ position: "relative" }}>
                <Avatar src={photoURL} size={64} />

                <Button
                  type="default"
                  size="small"
                  shape="circle"
                  icon={<HiPencil size={18} color={colors.teal100} />}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "white",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => navigate("profileSettings")}
                />
              </div>
            )}

            {/* [2022-07-07] if we do not have a username then we show the email else we show the username  */}
            <label
              style={{
                fontWeight: "normal",
                color: "#37474f",
                fontSize: "16px",
                fontFamily: "heebo",
              }}
              className="mt-3"
            >
              {isLogin.displayName != null
                ? isLogin.displayName
                : isLogin.email}
            </label>
          </Container>

          <Menu
            theme="light"
            style={{
              color: colors.teal100,
              // backgroundColor: colors.tealLight90,
              backgroundColor: sideBarBgColor,
              fontWeight: "bold",
            }}
            defaultSelectedKeys={["dashboard"]}
            selectedKeys={[selectedKey]}
            mode="inline"
            // items={menuItems(notifications.length)}
            onClick={handleItemClick}
          >
            {menuItems().map((item) => {
              return (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  style={{
                    color: colors.teal100,
                    backgroundColor: sideBarBgColor,
                    fontWeight: "bold",
                  }}
                >
                  {item.label}

                  {item.key == "notifications" && notifications.length > 0 && (
                    <Badge
                      count={notifications.length}
                      style={{
                        backgroundColor: "#00685e",
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: "18px",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    />
                  )}
                </Menu.Item>
              );
            })}
          </Menu>

          {/* {console.log(selectedKey)} */}
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
