import React, { useEffect, useState } from "react";
import { Input, Avatar, Modal, Form, notification } from "antd";
import { colors } from "../../utilities/colors";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import Selectable from "../Selectable/Selectable";
import { handleSignUp, handleAddTeamMember } from "../../services";
import { useUser } from "../../hooks/useContext";
import { generateNotification } from "../../utilities/generateNotification";
import { handleAddTeamMemberByInvite } from "../../services/handleAddTeamMemberByInvite";

export default function MemberSelection({
  itemSelected,
  setItemSelected,
  clickOk,
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
  const { isLogin, teamMembers } = useUser();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddMemberByEmailSubmit = (values) => {
    console.log(values);
    // here we create user with email
    handleSignUp(values.email)
      .then((user) => {
        console.log({
          [user.uid]: values,
          ...teamMembers,
        });
        handleAddTeamMemberByInvite(isLogin.uid, {
          receiverId: user.uid,
          receiverEmail: user.email,
          isLoginFirstTime: true,
          inviteBy: isLogin.uid,
          name: values.name,
        });

        generateNotification(
          "success",
          "Invite Sent",
          `An invite has been sent to ${values.email}`
        );
        setItemSelected({ text: values.name, id: user.uid });
        clickOk();
      })
      .catch((ex) =>
        generateNotification("error", "Error", "Failed to send invite!")
      );
  };
  const handleChange = (values, allValues) => {
    console.log(values, allValues);
  };
  useEffect(() => {
    let data = [];
    if (teamMembers != undefined && teamMembers != null) {
      data = Object.keys(teamMembers).map((key) => {
        return {
          email: teamMembers[key].email,
          name: teamMembers[key].name,
          id: key,
        };
      });
    }
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
          onFinish={handleAddMemberByEmailSubmit}
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
            <Input
              type="text"
              placeholder="Email"
              className="normal-input"
              autoComplete="off"
            />
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
            <Input type="text" placeholder="Name" className="normal-input" />
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
        className="normal-input"
      />
      <div className="px-3">
        <Selectable
          icon={<PlusOutlined />}
          text="Invite team member by email or text message"
          isItemActive={false}
          customColor={{ color: colors.teal100, bgColor: colors.cgLight95 }}
          onItemPress={showModal}
        />
        {/* <Selectable
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
        /> */}
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
                // image: <Avatar>LW</Avatar>,
                id: e.id,
              });
              console.log(currentItem);
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
            id: currentItem.id ? currentItem.id : "",
          });
          console.log(itemSelected);
          clickOk();
        }}
        className="col-12"
      >
        SELECT TEAM MEMBER
      </TealButton>
    </>
  );
}
