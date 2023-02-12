import React, { useEffect, useState } from "react";
import {
  Input,
  Avatar,
  Modal,
  Form,
  Dropdown,
  Menu,
  Typography,
  Tabs,
  Col,
  Row,
  Button,
} from "antd";

import { colors } from "../../utilities/colors";
import {
  PlusOutlined,
  UserOutlined,
  DeleteFilled,
  LinkOutlined,
  CloseCircleFilled,
  CheckOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import Selectable from "../Selectable/Selectable";
import {
  handleAddSystemUserToMember,
  handleCheckUserExsistInSystem,
  handleDeleteTeamMember,
  handleGetTeamMember,
  handleSendEmailToMember,
  handleSendInviteToMember,
  handleSignUp,
  handleUpdateTeamMemberStatus,
} from "../../services";
import { useUser } from "../../hooks/useContext";
import { generateNotification } from "../../utilities/generateNotification";
import { handleAddTeamMemberByInvite } from "../../services/handleAddTeamMemberByInvite";
import Loading from "../Loading/Loading";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { v4 } from "uuid";

const { Title, Text, Link } = Typography;

export default function MemberSelection({
  itemSelected,
  setItemSelected,
  clickOk,
  formMode,
  batonId,
}) {
  const [currentItem, setCurrentItem] = useState(null);
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [inviteSentTo, setInviteSentTo] = useState("");
  const [inviteId, setInviteId] = useState("");
  const [form] = Form.useForm();
  const { isLogin, teamMembers } = useUser();

  const handleOk = () => {
    console.log("handleOk");
    setIsModalVisible(false);
    setIsInviteSent(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    console.log("handleCancel");
    setIsModalVisible(false);
    setIsInviteSent(false);
    form.resetFields();
  };

  const onChange = (key) => {
    console.log(key);
  };

  // ! No need for this now, update it
  const handleAddMemberByEmailSubmit = (values) => {
    // 1. Check if user is already a member of the team, then show error
    // 2. if user is not a member of the team, then send mail

    console.log(members);
    // handleCheckUserExsistInSystem(values.email)
    //   .then((uid) => {
    //     let payload = {};
    //     if (uid) {
    //       console.log("User exsist in system, Adding member to team");
    //       payload = {
    //         receiverId: uid,
    //         receiverEmail: values.email,
    //         status: "pending",
    //         inviteBy: isLogin.uid,
    //         name: values.firstName + " " + values.lastName,
    //       };

    //       // sent email to the user and then add to database
    //     } else {
    //       console.log("User don't exsist in system, Adding member to team");
    //       payload = {
    //         receiverId: "",
    //         receiverEmail: values.email,
    //         status: "pending",
    //         inviteBy: isLogin.uid,
    //         name: values.firstName + " " + values.lastName,
    //       };
    //       handleAddTeamMemberByInvite(payload)
    //         .then(() => {
    //           console.log("Invite sent");
    //           setIsInviteSent(true);
    //           setInviteSentTo(values.email);
    //           setCurrentItem({
    //             name: payload.name,
    //             inviteBy: isLogin.uid,
    //             name: payload.name,
    //             image: (
    //               <Avatar style={{ backgroundColor: colors.tealLight20 }}>
    //                 {payload.name.substring(0, 2).toUpperCase()}
    //               </Avatar>
    //             ),
    //           });
    //           if (formMode) {
    //             setItemSelected({
    //               name: payload.name,
    //               inviteBy: isLogin.uid,
    //               name: payload.name,
    //               image: (
    //                 <Avatar style={{ backgroundColor: colors.tealLight20 }}>
    //                   {payload.name.substring(0, 2).toUpperCase()}
    //                 </Avatar>
    //               ),
    //             });
    //           }
    //         })
    //         .finally(() => setLoading(false))
    //         .catch((ex) => {
    //           generateNotification("error", "Error", ex.message);
    //         });
    //     }
    //   })

    if (
      members?.filter((item) => item.receiverEmail == values.email).length > 0
    ) {
      generateNotification(
        "error",
        "Error",
        "User already a member of the team"
      );
    } else {
      let invId = v4();
      setInviteId(invId);
      let payload = {
        receiverId: "temp",
        receiverEmail: values.email,
        status: "pending",
        inviteBy: isLogin.uid,
        batonId: batonId,
        name: values.firstName + " " + values.lastName,
        inviteId: invId,
      };

      var templateParams = {
        to_name: payload.name,
        to_email: payload.receiverEmail,
        url: `${new URL(window.location).origin}/signup/${invId}`,
      };
      emailjs.init("XfuoIqu_5KB37PoAW");
      emailjs.send("service_es7mh2u", "template_p180c7t", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
      return;
      setInviteSentTo("");
      setIsInviteSent(false);
      setLoading(true);

      // sent email to the user and then add to database
      // handleSendEmailToMember(emailPayload)
      // .then(() => {
      //   handleSendInviteToMember(payload)
      //     .then(() => {
      //       console.log("Invite sent");
      //       setIsInviteSent(true);
      //       setInviteSentTo(values.email);
      //       setCurrentItem({
      //         name: payload.name,
      //         id: inviteId,
      //         image: (
      //           <Avatar style={{ backgroundColor: colors.tealLight20 }}>
      //             {payload.name.substring(0, 2).toUpperCase()}
      //           </Avatar>
      //         ),
      //         status: "pending",
      //       });
      //       if (formMode) {
      //         setItemSelected({
      //           name: payload.name,
      //           id: payload.inviteId,
      //           image: (
      //             <Avatar style={{ backgroundColor: colors.tealLight20 }}>
      //               {payload.name.substring(0, 2).toUpperCase()}
      //             </Avatar>
      //           ),
      //           status: "pending",
      //         });
      //       }
      //     })
      //     .finally(() => setLoading(false))
      //     .catch((ex) => {
      //       // console.log(ex.message);
      //       generateNotification("error", "Error", ex.message);
      //     });
      // })
      // .catch((ex) => {
      //   // console.log(ex.message);
      //   generateNotification("error", "Error", ex.message);
      // })
      // .finally(() => setLoading(false));
    }
  };

  const renderInviteForm = () => {
    return (
      <Form
        name="normal_login"
        className="login-form d-flex col-12 flex-column align-items-center"
        layout="vertical"
        onFinish={handleAddMemberByEmailSubmit}
        form={form}
        requiredMark={false}
      >
        {isInviteSent == true && (
          <IniteNotificationContaianer className="mb-3">
            <CheckOutlined style={{ color: "white" }} />
            <Text className="ms-2" style={{ color: "white" }}>
              Invite sent to {inviteSentTo}
            </Text>
          </IniteNotificationContaianer>
        )}

        <Row className="col-12 d-flex justify-content-between">
          <Col span={11}>
            <Form.Item
              className="col-12"
              name="firstName"
              label="First name (required)"
              rules={[
                {
                  required: true,
                  message: "Please input the First Name!",
                },
              ]}
            >
              <FormInput type="text" className="normal-input" />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              className="col-12"
              name="lastName"
              label="Last name (required)"
              rules={[
                {
                  required: true,
                  message: "Please input the Last Name!",
                },
              ]}
            >
              <FormInput type="text" className="normal-input" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          className="col-12"
          name="email"
          label="Email address (required)"
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
          <FormInput
            type="text"
            // placeholder="Email"
            className="normal-input"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          className="col-12"
          name="confirmemail"
          label="Confirm email (required)"
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
          <FormInput
            type="text"
            // placeholder="Email"
            // className="normal-input"
            autoComplete="off"
          />
        </Form.Item>
        {/* <Form.Item className="mt-4 col-12 d-flex"> */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <Loading />
          </div>
        ) : (
          <div className="col-12">
            <Form.Item className="mb-0">
              <TealButton htmlType="submit" className="col-12 ">
                SEND INVITE
              </TealButton>
            </Form.Item>

            <TealButton
              htmlType="button"
              className="col-12"
              mode="outlined"
              onClick={handleOk}
            >
              CANCEL
            </TealButton>
          </div>
        )}
        {/* </Form.Item> */}
      </Form>
    );
  };

  const renderShareLink = () => {
    return (
      <Form
        name="normal_share"
        className="share-form d-flex col-12 flex-column align-items-center"
        layout="vertical"
        aria-readonly="true"
        form={form}
      >
        <Form.Item
          className="col-12"
          name="shareLink"
          label="Share link with anyone"
          initialValue={
            // `http://localhost:3000/invite?inviteBy=${isLogin.uid}&baton=${batonId}`
            `${new URL(window.location).origin}/signup/${inviteId}`
          }
        >
          <FormInput
            type="text"
            prefix={<LinkOutlined className="site-form-item-icon" />}
            suffix={
              <Button
                icon={<CopyOutlined />}
                style={{ margin: 0 }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    // `http://localhost:3000/invite?inviteBy=${isLogin.uid}&baton=${batonId}`
                    `${new URL(window.location).origin}/signup/${inviteId}`
                  );
                }}
              />
            }
            // disabled={true}
          />
        </Form.Item>
      </Form>
    );
  };

  const items = [
    {
      key: "1",
      label: `Invite by email`,
      children: renderInviteForm(),
    },
    {
      key: "2",
      label: `Invite by share link`,
      children: renderShareLink(),
    },
  ];

  const onClick = ({ key, label }) => {
    // alert(`Click on item ${key} ${label}`);
    handleUpdateTeamMemberStatus(key, "deleted")
      .then(() => generateNotification("success", "Success", "Member deleted"))
      .catch((ex) =>
        generateNotification("error", "Error", "Error deleting member")
      );
  };

  const onTabItemClick = (key) => {
    // console.log(key);

    if (key == "2" && itemSelected == null) {
      console.log("send invite by link", formMode);
      let invId = v4();
      // console.log(invId);
      setInviteId(invId);
      if (itemSelected?.name === "Waiting for member to join") return;
      let payload = {
        receiverId: "temp",
        receiverEmail: "temp@temp.com",
        status: "pending",
        inviteBy: isLogin.uid,
        batonId: batonId,
        name: "Waiting for member to join",
        inviteId: invId,
      };
      handleSendInviteToMember(payload)
        .then(() => {
          setCurrentItem({
            name: payload.name,
            id: payload.inviteId,
            image: (
              <Avatar style={{ backgroundColor: colors.tealLight20 }}>
                {payload.name.substring(0, 2).toUpperCase()}
              </Avatar>
            ),
            status: "pending",
          });
          if (formMode) {
            setItemSelected({
              name: payload.name,
              id: payload.inviteId,
              image: (
                <Avatar style={{ backgroundColor: colors.tealLight20 }}>
                  {payload.name.substring(0, 2).toUpperCase()}
                </Avatar>
              ),
              status: "pending",
            });
          }
        })
        .catch((ex) => {
          generateNotification("error", "Error", ex.message);
        });
    } else {
      console.log("formMode Not", itemSelected);
      setInviteId(itemSelected?.id);
      console.log(inviteId);
    }
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

  return (
    <>
      {/* Invite Member Modal Section */}
      <Modal
        title="Invite a new team member"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        mask={false}
      >
        <Text strong>
          Start collabrating with your team member by sending an invite to your
          Baton.
        </Text>

        <TabNav
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          tabBarGutter={15}
          className="mt-2"
          onTabClick={onTabItemClick}
        />
      </Modal>

      {/* -----------------Memebers View and Search Section----------------------- */}
      <Selectable
        icon={<PlusOutlined />}
        text="Invite team member by email or text message"
        isItemActive={false}
        customColor={{ color: colors.teal100, bgColor: colors.cgLight95 }}
        onItemPress={showModal}
      />

      <Input
        placeholder="Search by name or email"
        size="large"
        style={{ borderRadius: 5, width: "100%", height: 50 }}
        onChange={(e) => setSearchText(e.currentTarget.value)}
        className="normal-input mt-3"
      />
      <div className="px-0">
        {formMode
          ? members.map((e, index) => (
              <Row className="d-flex align-items-center" key={index}>
                <Col
                  xl={{ span: 20 }}
                  lg={{ span: 18 }}
                  md={{ span: 19 }}
                  xs={{ span: 21 }}
                >
                  <Selectable
                    key={index}
                    image={
                      <Avatar style={{ backgroundColor: colors.teal100 }}>
                        {e.name.substring(0, 2).toUpperCase()}
                      </Avatar>
                    }
                    text={e.name}
                    isItemActive={currentItem?.name === e.name ? true : false}
                    onItemPress={() => {
                      // console.log("selected Item", e);
                      setCurrentItem({
                        name: e.name,
                        id: e.receiverId,
                        status: e.status,
                      });
                      // currentItem;
                    }}
                    status={e.status}
                  />
                </Col>
                <Col
                  xl={{ span: 4 }}
                  lg={{ span: 6 }}
                  md={{ span: 5 }}
                  xs={{ span: 3 }}
                >
                  <PressableText
                    onClick={() => {
                      handleDeleteTeamMember(e.docId)
                        .then(() => {
                          generateNotification(
                            "success",
                            "Success",
                            "Member deleted"
                          );
                        })
                        .catch((ex) => {
                          generateNotification(
                            "error",
                            "Error",
                            "Error deleting member"
                          );
                        });
                    }}
                  >
                    <CloseCircleFilled style={{ color: colors.mosque }} />
                    <Text
                      className="ms-1 d-none d-md-block"
                      style={{
                        color: colors.mosque,
                        textDecoration: "underline",
                      }}
                    >
                      Remove
                    </Text>
                  </PressableText>
                </Col>
              </Row>
            ))
          : members.map((e, index) => (
              <Dropdown
                key={index}
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
                    icon={
                      <Avatar style={{ backgroundColor: colors.teal100 }}>
                        {e.name.substring(0, 2).toUpperCase()}
                      </Avatar>
                    }
                    text={e.name}
                    isItemActive={false}
                    status={e.status}
                    onItemPress={() => {}}
                    statusColor={
                      e.status == "pending" ? "#F29339" : colors.teal100
                    }
                  />
                </div>
              </Dropdown>
            ))}
      </div>

      {formMode && (
        <TealButton
          onClick={() => {
            // console.log("currentItem", currentItem);
            if (currentItem)
              setItemSelected({
                name: currentItem.name,
                id: currentItem.id ? currentItem.id : "",
                status: currentItem.status,
              });
            // console.log(itemSelected);
            clickOk();
          }}
          className="col-12"
        >
          SELECT TEAM MEMBER
        </TealButton>
      )}

      <div style={{ height: "50px" }} />
    </>
  );
}

const TabNav = styled(Tabs)`
  font-weight: 500;
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${colors.mosque} !important;
  }
  .ant-tabs-tab:hover {
    color: ${colors.mosque} !important;
  }
  .ant-tabs-ink-bar {
    background: ${colors.mosque} !important;
  }
`;

const FormInput = styled(Input)`
  height: 40px;
  border-color: #c0c0c0 !important;
  &.ant-input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: black !important;
    -webkit-box-shadow: 0 0 0px 1000px #fffff inset !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }
  &.ant-input:hover {
    border-color: ${colors.mosque} !important;
  }
  &.ant-input:focus {
    border-color: ${colors.mosque} !important;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
  }

  &.ant-form-item-label {
    font-weight: bold !important;
  }
`;

const IniteNotificationContaianer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  background-color: ${colors.mosque};
  padding: 10px;
  width: 100%;
`;

const PressableText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 15px;
  &:hover {
    color: ${colors.cyprus};
    user-select: none;
  }
`;
