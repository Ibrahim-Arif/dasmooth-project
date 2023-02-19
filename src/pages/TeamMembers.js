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
import {
  PlusOutlined,
  UserOutlined,
  DeleteFilled,
  LinkOutlined,
  CloseCircleFilled,
  CheckOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { colors } from "../utilities/colors";
import { TealButton, Selectable, Loading } from "../components";

import {
  handleAddSystemUserToMember,
  handleCheckUserExsistInSystem,
  handleDeleteTeamMember,
  handleGetTeamMember,
  handleSendEmailToMember,
  handleSendInviteToMember,
  handleSignUp,
  handleAddTeamMember,
  handleUpdateTeamMemberStatus,
  handleAddNotification,
} from "../services";
import { useUser } from "../hooks/useContext";
import { generateNotification } from "../utilities/generateNotification";
import { handleAddTeamMemberByInvite } from "../services/handleAddTeamMemberByInvite";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { v4 } from "uuid";

const { Title, Text, Link } = Typography;

export default function TeamMembers() {
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [inviteSentTo, setInviteSentTo] = useState("");
  const [inviteId, setInviteId] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  const [removeMemberId, setRemoveMemberId] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);

  const [form] = Form.useForm();

  const { isLogin, teamMembers } = useUser();
  console.log("teamMembers", teamMembers);

  const handleOk = () => {
    console.log("handleOk");
    setIsModalVisible(false);
    setIsInviteSent(false);
  };

  const handleRemoveOk = () => {
    console.log("handleRemoveOk");
    setIsRemoveModalVisible(false);
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

  const handleAddMemberByEmailSubmit = (values) => {
    // 1. Check if user is already a member of the team, then show error
    // 2. if user is not a member of the team, then send mail

    console.log("handleAddMemberByEmailSubmit");
    if (values.email?.toLowerCase() === isLogin.email?.toLowerCase()) return;
    if (
      members?.filter(
        (item) =>
          item.receiverEmail?.toLowerCase() == values.email?.toLowerCase()
      ).length > 0
    ) {
      generateNotification(
        "error",
        "Error",
        "User already a member of the team"
      );
    } else {
      setLoading(true);
      let invId = v4();
      setInviteId(invId);
      let payload = {
        receiverId: "temp",
        receiverEmail: values.email?.toLowerCase(),
        status: "pending",
        inviteBy: isLogin.uid,
        batonId: null,
        name: values.firstName + " " + values.lastName,
        inviteId: invId,
        inviteType: "email",
        timeStamp: new Date().getTime(),
      };

      var templateParams = {
        to_name: payload.name,
        to_email: payload.receiverEmail?.toLowerCase(),
        url: `${new URL(window.location).origin}/signup/${invId}`,
      };
      emailjs.init("l-LW9FV7je0GRpUsN");
      emailjs
        .send("service_sqizzqr", "template_7rhfybc", templateParams)
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            setInviteSentTo("");
            setIsInviteSent(false);
            // sent email to the user and then add to database
            handleSendInviteToMember(payload)
              .then(() => {
                // add member to team with pending status
                payload = {
                  receiverId: "",
                  receiverEmail: values.email,
                  status: "pending",
                  inviteBy: isLogin.uid,
                  name: values.firstName + " " + values.lastName,
                };
                handleAddTeamMember(invId, payload)
                  .then(() => {
                    console.log("Invite sent");
                    setIsInviteSent(true);
                    setInviteSentTo(values.email?.toLowerCase());
                  })
                  .finally(() => setLoading(false));
              })

              .catch((ex) => {
                // console.log(ex.message);
                generateNotification("error", "Error", ex.message);
              });
          },
          function (ex) {
            generateNotification("error", "Error", ex.message);
          }
        )
        .catch((ex) => {
          generateNotification("error", "Error", ex.message);
          setLoading(false);
        });
    }
  };

  const renderInviteForm = () => {
    return (
      <Form
        name="normal_login"
        className="login-form d-flex col-12 flex-column align-items-center"
        layout="vertical"
        onFinish={handleAddMemberByEmailSubmit}
        // form={form}
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
              message: "Please input your Confirm-Email!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (
                  !value ||
                  getFieldValue("email")?.toLowerCase() === value?.toLowerCase()
                ) {
                  return Promise.resolve();
                }
                return Promise.reject("Emails does not match!");
              },
            }),
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
              <TealButton
                htmlType="submit"
                className="col-12 "
                disabled={isInviteSent}
                onClick={() => console.log("clicked")}
              >
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
      <>
        {showLink ? (
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
                    icon={!linkCopied && <CopyOutlined size={15} />}
                    type="text"
                    style={{ margin: 0 }}
                    size="small"
                    onClick={() => {
                      setLinkCopied(true);
                      navigator.clipboard.writeText(
                        // `http://localhost:3000/invite?inviteBy=${isLogin.uid}&baton=${batonId}`
                        `${new URL(window.location).origin}/signup/${inviteId}`
                      );
                    }}
                  >
                    {linkCopied && "Copied"}
                  </Button>
                }
                // disabled={true}
              />
            </Form.Item>
          </Form>
        ) : (
          <TealButton
            className="col-12"
            onClick={() => {
              setLinkCopied(false);
              navigator.clipboard.writeText("");
              handleCreateShareableLink();
              setShowLink(true);
            }}
          >
            Create Shareble Link
          </TealButton>
        )}
      </>
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
    const response = window.confirm(
      "Are you sure you want to delete this member?"
    );
    if (!response) return;
    handleUpdateTeamMemberStatus(key, "deleted")
      .then(() => generateNotification("success", "Success", "Member deleted"))
      .catch((ex) =>
        generateNotification("error", "Error", "Error deleting member")
      );
  };

  const handleCreateShareableLink = () => {
    console.log("send invite by link");
    let invId = v4();
    // console.log(invId);
    setInviteId(invId);

    let payload = {
      receiverId: null,
      receiverEmail: null,
      status: "pending",
      inviteBy: isLogin.uid,
      batonId: null,
      name: "Waiting for member to join",
      inviteId: invId,
      inviteType: "link",
      timeStamp: new Date().getTime(),
    };
    handleSendInviteToMember(payload)
      .then(() => {
        console.log("invite sent", payload);
      })
      .catch((ex) => {
        generateNotification("error", "Error", ex.message);
      });
  };

  const onTabItemClick = (key) => {
    // console.log(key);
    if (key == "1") {
    }

    if (key == "2") {
      setShowLink(false);
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
      {/* Remove Modal */}
      <PopUpModal
        title="Confirm"
        visible={isRemoveModalVisible}
        onCancel={handleRemoveOk}
        footer={null}
        mask={false}
      >
        <Text strong style={{ fontSize: 16 }}>
          Are you sure you want to delete this team member from your list of
          team members. This process cannot be undone
        </Text>

        {removeLoading ? (
          <div className="col-12 d-flex align-items-center justify-content-center">
            <Loading />
          </div>
        ) : (
          <div className="col-12">
            <TealButton
              htmlType="button"
              className="col-12"
              onClick={() => {
                setRemoveLoading(true);
                handleDeleteTeamMember(removeMemberId)
                  .then(() => {
                    setRemoveMemberId("");
                    setRemoveLoading(false);
                    handleRemoveOk();
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
                    setRemoveLoading(false);
                  });
              }}
            >
              REMOVE TEAM MEMBER
            </TealButton>

            <TealButton
              htmlType="button"
              className="col-12"
              mode="outlined"
              onClick={handleRemoveOk}
            >
              CANCEL
            </TealButton>
          </div>
        )}
      </PopUpModal>
      <Container className="p-3 justify-content-start ms-0 d-flex flex-column">
        <h5>Team Members</h5>
        <Container className="col-12 col-lg-6  ms-0 align-self-start">
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
                Start collabrating with your team member by sending an invite to
                your Baton.
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
              {members.map((e, index) => (
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
                      onClick={() => {
                        setRemoveMemberId(e.docId);
                        setIsRemoveModalVisible(true);
                      }}
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
                      email={e.receiverEmail}
                    />
                  </div>
                </Dropdown>
              ))}
            </div>

            <div style={{ height: "50px" }} />
          </>
        </Container>
      </Container>
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
const PopUpModal = styled(Modal)`
  .ant-modal-close {
    color: black !important;
  }
  .ant-modal-title {
    font-weight: bold !important;
  }
`;
