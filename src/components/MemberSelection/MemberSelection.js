import React, { useEffect, useState } from "react";
import { Input, Avatar, Modal, Form } from "antd";
import { colors } from "../../utilities/colors";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import Selectable from "../Selectable/Selectable";

export default function MemberSelection({
  itemSelected,
  setItemSelected,
  clickOk,
  teamMembers = [],
}) {
  const [currentItem, setCurrentItem] = useState({
    text: "Select a team member",
    icon: <UserOutlined />,
    image: null,
  });
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    console.log(values);
  };
  const handleChange = (values, allValues) => {
    console.log(values, allValues);
  };
  useEffect(() => {
    let data = Object.values(teamMembers);
    // .map((key) => {
    //   return {
    //     email: teamMembers[key].email,
    //     name: teamMembers[key].name,
    //     id: key,
    //   };
    // });
    // console.log(searchText);
    // console.log(data);
    // return;
    if (searchText == "") {
      setMembers(data);
    } else {
      data = data.filter(
        (e) => e.email.includes(searchText) || e.name.includes(searchText)
      );
      setMembers(data);
    }
  }, [teamMembers, searchText]);
  return (
    <>
      {/* Invite Member Modal Section */}
      <Modal
        title="Invite New User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        mask={false}
      >
        <Form
          name="normal_login"
          className="login-form d-flex col-12 flex-column align-items-center"
          initialValues={{}}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            className="col-12"
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input type="text" placeholder="Email" autoComplete="off" />
          </Form.Item>

          <Form.Item
            className="col-12"
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the Name!",
              },
            ]}
          >
            <Input type="text" placeholder="Name" />
          </Form.Item>

          <Form.Item className="mt-4 col-12">
            <TealButton htmlType="submit" className="col-12">
              Submit
            </TealButton>
          </Form.Item>
        </Form>
      </Modal>

      {/* -----------------Memebers View and Search Section----------------------- */}
      <Input
        placeholder="Search by name or email"
        size="large"
        style={{ borderRadius: 5, width: "100%" }}
        onChange={(e) => setSearchText(e.currentTarget.value)}
      />
      <div className="px-3">
        <Selectable
          icon={<PlusOutlined />}
          text="Invite team member by email or text message"
          isItemActive={false}
          customColor={{ color: colors.teal100, bgColor: colors.cgLight95 }}
          onItemPress={showModal}
        />
        <Selectable
          onItemPress={() => {
            setCurrentItem({
              text: "Oswaldo Mondenza",
              image: <Avatar src="https://joeschmoe.io/api/v1/random" />,
            });
          }}
          image={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          text="Oswaldo Mondenza"
          isItemActive={currentItem.text === "Oswaldo Mondenza" ? true : false}
        />
        <Selectable
          image={
            <Avatar style={{ backgroundColor: colors.teal100 }}>LW</Avatar>
          }
          text="Lynda Well"
          isItemActive={currentItem.text === "Lynda Well" ? true : false}
          onItemPress={() => {
            setCurrentItem({
              text: "Lynda Well",
              image: <Avatar>LW</Avatar>,
            });
          }}
        />
        {members.map((e, index) => (
          <Selectable
            key={index}
            image={
              <Avatar style={{ backgroundColor: colors.teal100 }}>LW</Avatar>
            }
            text={e.name}
            isItemActive={currentItem.text === e.name ? true : false}
            onItemPress={() => {
              setCurrentItem({
                text: e.name,
                image: <Avatar>LW</Avatar>,
              });
            }}
          />
        ))}
        {/* <FormItemSelect
          image={<Avatar style={{ position: "absolute" }}>JW</Avatar>}
          text="James White"
          isItemActive={false}
        /> */}
      </div>
      <TealButton
        onClick={() => {
          setItemSelected({
            text: currentItem.text,
            image: currentItem.image,
            icon: currentItem.icon,
          });
          clickOk();
        }}
        className="col-12"
      >
        SELECT TEAM MEMBER
      </TealButton>
    </>
  );
}
