import React, { useEffect, useState } from "react";
import { Input, Avatar, Modal, Form, Dropdown, Menu } from "antd";
import { colors } from "../../utilities/colors";
import { PlusOutlined, UserOutlined, DeleteFilled } from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import Selectable from "../Selectable/Selectable";
import {
  handleAddSystemUserToMember,
  handleSignUp,
  handleUpdateTeamMemberStatus,
} from "../../services";
import { useUser } from "../../hooks/useContext";
import { generateNotification } from "../../utilities/generateNotification";
import { handleAddTeamMemberByInvite } from "../../services/handleAddTeamMemberByInvite";

export default function MemberSelection({
  itemSelected,
  setItemSelected,
  clickOk,
  formMode,
}) {
  const [currentItem, setCurrentItem] = useState({
    text: "Select a team member",
    icon: <UserOutlined />,
    image: null,
  });
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    handleSignUp(values.email, null, true)
      .then((user) => {
        // console.log({
        //   [user.uid]: values,
        //   ...teamMembers,
        // });
        handleAddTeamMemberByInvite({
          receiverId: user.uid,
          receiverEmail: user.email,
          status: "pending",
          inviteBy: isLogin.uid,
          name: values.name,
        }).finally(() => setLoading(false));

        generateNotification(
          "success",
          "Invite Sent",
          `An invite has been sent to ${values.email}`
        );
        if (formMode) {
          setItemSelected({
            text: values.name,
            inviteBy: isLogin.uid,
            name: values.name,
          });
        }
        handleCancel();
      })
      .catch((ex) => {
        if (ex.message == "auth/email-already-in-use") {
          handleAddSystemUserToMember({
            email: values.email,
            inviteBy: isLogin.uid,
            name: values.name,
          })
            .then(() => {
              generateNotification(
                "success",
                "Member Added",
                `${values.email} added`
              );
              handleCancel();
            })
            .finally(() => setLoading(false));
        } else {
          generateNotification("error", "Error", ex.message);
        }
      });
  };
  const handleChange = (values, allValues) => {
    console.log(values, allValues);
  };
  useEffect(() => {
    let data = teamMembers;

    // console.log(searchText);
    // console.log(data);
    // return;
    if (searchText == "") {
      setMembers(data);
    } else {
      data = teamMembers.filter(
        (e) =>
          e.receiverEmail.toLowerCase().includes(searchText.toLowerCase()) ||
          e.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setMembers(data);
    }
  }, [teamMembers, searchText]);

  const onClick = ({ key, label }) => {
    // alert(`Click on item ${key} ${label}`);
    handleUpdateTeamMemberStatus(key, "deleted")
      .then(() => generateNotification("success", "Success", "Member deleted"))
      .catch((ex) =>
        generateNotification("error", "Error", "Error deleting member")
      );
  };

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
          form={form}
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

        {formMode
          ? members.map((e, index) => (
              <Selectable
                key={index}
                image={
                  <Avatar style={{ backgroundColor: colors.teal100 }}>
                    {e.name.substring(0, 2).toUpperCase()}
                  </Avatar>
                }
                text={e.name}
                isItemActive={currentItem.text === e.name ? true : false}
                onItemPress={() => {
                  setCurrentItem({
                    text: e.name,
                    image: (
                      <Avatar>{e.name.substring(0, 2).toUpperCase()}</Avatar>
                    ),
                    id: e.receiverId,
                    status: e.status,
                  });
                  console.log(currentItem);
                }}
                status={e.status}
              />
            ))
          : members.map((e, index) => (
              <Dropdown
                overlay={() => (
                  <Menu
                    items={[
                      {
                        label: "Delete",
                        key: e.docId,
                        icon: <DeleteFilled />,
                      },
                    ]}
                    onClick={onClick}
                  />
                )}
                trigger={["click"]}
              >
                <div>
                  <Selectable
                    key={e.docId}
                    image={
                      <Avatar style={{ backgroundColor: colors.teal100 }}>
                        {e.name.substring(0, 2).toUpperCase()}
                      </Avatar>
                    }
                    text={e.name}
                    isItemActive={false}
                    status={e.status}
                    onItemPress={() => {}}
                    statusColor={
                      e.status == "pending" ? "yellow" : colors.teal100
                    }
                  />
                </div>
              </Dropdown>
            ))}
      </div>

      {formMode && (
        <TealButton
          onClick={() => {
            setItemSelected({
              text: currentItem.text,
              image: currentItem.image,
              icon: currentItem.icon,
              id: currentItem.id ? currentItem.id : "",
              status: currentItem.status,
            });
            console.log(itemSelected);
            clickOk();
          }}
          className="col-12"
        >
          SELECT TEAM MEMBER
        </TealButton>
      )}
    </>
  );
}
