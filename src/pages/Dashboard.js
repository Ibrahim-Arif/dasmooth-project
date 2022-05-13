import React, { useState } from "react";

import { Container } from "react-bootstrap";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileAddOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { DashboardView, FormItemSelect, ImageUpload } from "../components";
import { colors } from "../utilities/colors";

import "./dashboard.css";
export default function Dashboard() {
  const [mode, setMode] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTitle, setActiveTitle] = useState("Dummy");
  const [activeComponent, setActiveComponent] = useState(
    <p>Some contents...</p>
  );
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormItemRender = (title, component) => {
    switch (title) {
      case "Attach a file":
        setActiveComponent(<ImageUpload boxColor={colors.teal100} />);
        break;

      default:
        setActiveComponent(<p>{title}</p>);
        break;
    }
    setActiveTitle(title);
    if (window.innerWidth < 1024) {
      showModal();
    }
  };
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
                <FormItemSelect
                  icon={<UserOutlined />}
                  text=" Select a team member"
                  onItemPress={() =>
                    handleFormItemRender("Select a team member", null)
                  }
                />
                <FormItemSelect
                  icon={<CalendarOutlined />}
                  text=" Set a deadline"
                  onItemPress={() =>
                    handleFormItemRender("Set a deadline", null)
                  }
                />
                <FormItemSelect
                  icon={<DollarOutlined />}
                  text=" Set a budget"
                  onItemPress={() => handleFormItemRender("Set a budget", null)}
                />
                <FormItemSelect
                  icon={<FileAddOutlined />}
                  text=" Attach a file"
                  onItemPress={() =>
                    handleFormItemRender("Attach a file", null)
                  }
                />
                <FormItemSelect
                  icon={<FileTextOutlined />}
                  text=" Post an Update"
                  onItemPress={() =>
                    handleFormItemRender("Post an Update", null)
                  }
                />
              </Container>
            </>
          )}
        </Container>

        {/*  */}
        <Container className="col flex-column d-none d-lg-flex">
          <h5>{activeTitle}</h5>
          {activeComponent}
        </Container>
      </Container>
    </>
  );
}
