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
import { DashboardView, FormItemSelect, ImageUpload } from "../components";
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
    }
  }, [mode]);
  return (
    <>
      <Container className="row mt-4">
        <Container className="col">
          {mode === 0 ? (
            <DashboardView setMode={setMode} />
          ) : (
            <>
              <Container className="col">
                <Modal
                  title={activeTitle}
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
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
                  icon={<UserOutlined />}
                  text=" Select a team member"
                  onItemPress={() =>
                    handleFormItemRender("Select a team member", null, 1)
                  }
                  isItemActive={activeItemIndex == 1 ? true : false}
                />
                <FormItemSelect
                  icon={<CalendarOutlined />}
                  text=" Set a deadline"
                  isItemActive={activeItemIndex == 2 ? true : false}
                  onItemPress={() =>
                    handleFormItemRender("Set a deadline", null, 2)
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
        <Container className="col flex-column d-none d-lg-flex">
          {mode != 0 && (
            <>
              <h5>{activeTitle}</h5>
              {activeComponent}
            </>
          )}
        </Container>
      </Container>
    </>
  );
}
