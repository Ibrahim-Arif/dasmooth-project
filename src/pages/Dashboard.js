import React, { useState, useEffect } from "react";

import { Container } from "react-bootstrap";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileAddOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import { Modal } from "antd";

import {
  BudgetForm,
  DashboardView,
  DateTimeSelection,
  Selectable,
  ImageUpload,
  MemberSelection,
  PostUpdateForm,
} from "../components";
import { colors } from "../utilities/colors";

import "./dashboard.css";
import { TealButton } from "../components/FormButton/FormButton";
import { flushSync } from "react-dom";

export default function Dashboard() {
  const [mode, setMode] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const [teamMemberData, setTeamMemberData] = useState({
    text: "Select a team member",
    icon: <UserOutlined />,
    image: null,
  });
  const [dateData, setDateData] = useState("Set a deadline");
  const [budgetData, setBudgetData] = useState("Set a budget");
  const [postUpdateData, setPostUpdateData] = useState("");

  const [filesList, setFilesList] = useState({
    text: "Attach a file",
    filesList: [],
  });

  const flushData = () => {
    setActiveComponent(null);
    setActiveItemIndex(-1);
    setActiveTitle("");
    setTeamMemberData({
      text: "Select a team member",
      icon: <UserOutlined />,
      image: null,
    });
    setDateData("Set a deadline");
    setBudgetData("Set a budget");
    setPostUpdateData("");
    setFilesList({
      text: "Attach a file",
      filesList: [],
    });
  };
  const handlePass = () => {
    console.log(dateData, budgetData, postUpdateData, filesList.filesList);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormItemRender = (title, component, index) => {
    setActiveComponent(component);
    setActiveItemIndex(index);
    setActiveTitle(title);
    if (window.innerWidth < 1024) {
      showModal();
    }
  };

  useEffect(() => {
    if (mode == 1) {
      flushData();
    }
  }, [mode]);

  return (
    <>
      <Container className="d-flex flex-row mt-4 mx-0 justify-content-start align-items-start justify-content-lg-start">
        <Container className="col">
          {mode === 0 ? (
            <DashboardView setMode={setMode} />
          ) : (
            <>
              <Container className="col">
                <Modal
                  title={activeTitle}
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                  mask={false}
                >
                  {activeComponent}
                </Modal>
                {/* <Button icon={<ArrowLeftOutlined style={{ fontSize: 20 }} />} /> */}
                <ArrowLeftOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => setMode(0)}
                />
                <h4 className="mt-4">Get new city permit</h4>
                {/* FormItems */}
                <Selectable
                  icon={null}
                  text="We need to get a permit for the Bilal and Ibrahim location"
                  isItemActive={false}
                  customColor={{ color: "black", bgColor: "white" }}
                />

                <Selectable
                  icon={teamMemberData.icon}
                  image={teamMemberData.image}
                  text={teamMemberData.text}
                  onItemPress={() =>
                    handleFormItemRender(
                      "Select a member",
                      <MemberSelection
                        itemSelected={teamMemberData}
                        setItemSelected={setTeamMemberData}
                        clickOk={handleOk}
                      />,
                      1
                    )
                  }
                  isItemActive={
                    activeItemIndex == 1 ||
                    teamMemberData.text != "Select a team member"
                      ? true
                      : false
                  }
                />
                <Selectable
                  icon={<CalendarOutlined />}
                  text={dateData}
                  isItemActive={
                    activeItemIndex == 2 || dateData != "Set a deadline"
                      ? true
                      : false
                  }
                  onItemPress={() =>
                    handleFormItemRender(
                      "Set a deadline",
                      <DateTimeSelection
                        itemSelected={dateData}
                        setItemSelected={setDateData}
                        clickOk={handleOk}
                      />,
                      2
                    )
                  }
                />
                <Selectable
                  icon={<DollarOutlined />}
                  text={budgetData}
                  isItemActive={
                    activeItemIndex == 3 || budgetData != "Set a budget"
                      ? true
                      : false
                  }
                  onItemPress={() =>
                    handleFormItemRender(
                      "Set a budget",
                      <BudgetForm
                        itemSelected={budgetData}
                        setItemSelected={setBudgetData}
                        clickOk={handleOk}
                      />,
                      3
                    )
                  }
                />
                <Selectable
                  icon={<FileAddOutlined />}
                  text={filesList.text}
                  isItemActive={
                    activeItemIndex == 4 || filesList.text != "Attach a file"
                      ? true
                      : false
                  }
                  onItemPress={() =>
                    handleFormItemRender(
                      "Attach a file",
                      <ImageUpload
                        boxColor={colors.teal100}
                        itemSelected={filesList}
                        setItemSelected={setFilesList}
                        clickOk={handleOk}
                      />,
                      4
                    )
                  }
                />
                <Selectable
                  icon={<FileTextOutlined />}
                  text="Post an Update"
                  isItemActive={
                    activeItemIndex == 5 || postUpdateData != "" ? true : false
                  }
                  onItemPress={() =>
                    handleFormItemRender(
                      "Post an Update",
                      <PostUpdateForm
                        itemSelected={postUpdateData}
                        setItemSelected={setPostUpdateData}
                        clickOk={handleOk}
                      />,
                      5
                    )
                  }
                />
              </Container>
              <TealButton className="col-12" onClick={handlePass}>
                PASS
              </TealButton>
            </>
          )}
        </Container>

        {/*  */}
        <Container
          className="col flex-column d-none d-lg-flex"
          style={{ borderLeft: "1px solid grey" }}
        >
          {mode != 0 && (
            <>
              <h4>{activeTitle}</h4>
              {activeComponent}
            </>
          )}
        </Container>
      </Container>
    </>
  );
}
