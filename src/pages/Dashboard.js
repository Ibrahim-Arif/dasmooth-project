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
import { Modal, Button } from "antd";
import {
  DashboardView,
  DateTimeSelection,
  FormItemSelect,
  ImageUpload,
  MemberSelection,
} from "../components";
import { colors } from "../utilities/colors";

import "./dashboard.css";
export default function Dashboard() {
  const [mode, setMode] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const [teamMemeberData, setTeamMemberData] = useState({
    text: "Select a team member",
    icon: <UserOutlined />,
    image: null,
  });

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
      setActiveComponent(null);
      setActiveItemIndex(-1);
      setActiveTitle("");
      setTeamMemberData({
        text: "Select a team member",
        icon: <UserOutlined />,
        image: null,
      });
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
                <FormItemSelect
                  icon={null}
                  text="We need to get a permit for the Bilal and Ibrahim location"
                  isItemActive={false}
                  customColor={{ color: "black", bgColor: "white" }}
                />
                <FormItemSelect
                  icon={teamMemeberData.icon}
                  image={teamMemeberData.image}
                  text={teamMemeberData.text}
                  onItemPress={() =>
                    handleFormItemRender(
                      teamMemeberData.text,
                      <MemberSelection
                        itemSelected={teamMemeberData}
                        setItemSelected={setTeamMemberData}
                        clickOk={handleOk}
                      />,
                      1
                    )
                  }
                  isItemActive={
                    activeItemIndex == 1 ||
                    teamMemeberData.text != "Select a team member"
                      ? true
                      : false
                  }
                />
                <FormItemSelect
                  icon={<CalendarOutlined />}
                  text=" Set a deadline"
                  isItemActive={activeItemIndex == 2 ? true : false}
                  onItemPress={() =>
                    handleFormItemRender(
                      "Set a deadline",
                      <DateTimeSelection />,
                      2
                    )
                  }
                />
                <FormItemSelect
                  icon={<DollarOutlined />}
                  text=" Set a budget"
                  isItemActive={activeItemIndex == 3 ? true : false}
                  onItemPress={() =>
                    handleFormItemRender("Set a budget", null, 3)
                  }
                />
                <FormItemSelect
                  icon={<FileAddOutlined />}
                  text=" Attach a file"
                  isItemActive={activeItemIndex == 4 ? true : false}
                  onItemPress={() =>
                    handleFormItemRender(
                      "Attach a file",
                      <ImageUpload boxColor={colors.teal100} />,
                      4
                    )
                  }
                />
                <FormItemSelect
                  icon={<FileTextOutlined />}
                  text=" Post an Update"
                  isItemActive={activeItemIndex == 5 ? true : false}
                  onItemPress={() =>
                    handleFormItemRender("Post an Update", null, 5)
                  }
                />
              </Container>
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
