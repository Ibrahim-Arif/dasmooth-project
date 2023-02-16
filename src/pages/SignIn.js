import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styledComponents from "styled-components";
import { colors } from "../utilities/colors";
import { logo } from "../assets";
import {
  handleGetInvite,
  handleAddTeamMember,
  handleUpdateBaton,
  handleUpdateInviteStatus,
  handleUpdateTeamMember,
} from "../services";
import { generateNotification } from "../utilities/generateNotification";
import { Loading } from "../components";
import { useUser } from "../hooks/useContext";
import { handleSignIn } from "../services/handleSignIn";
import { useCheckSignIn } from "../hooks/useCheckSignIn";

export default function SignIn() {
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inviteData, setInviteData] = useState(null);
  const [inviteId, setInviteId] = useState(null);
  const { setIsLogin, isLogin } = useUser();
  const auth = getAuth();

  // useCheckSignIn();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    if (id) {
      setInviteId(id);
      handleGetInvite(id)
        .then((data) => {
          if (data) {
            setInviteData(data);
            if (data?.receiverEmail != null)
              form.setFieldValue("email", data?.receiverEmail);
            console.log(data);
          } else {
            generateNotification("error", "Error", "Invalid Invitation");
            // navigate("/");
          }
        })
        .catch((ex) => {
          generateNotification("error", "Error", "Invalid Invitation");
          // navigate("/");
        });
    }
    document.getElementById("body").style.backgroundColor = colors.htmlColor;
  }, []);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);

    // if there is an id, then it means the user is signing ip from an invite
    if (inviteId) {
      // first signIn the user
      if (
        inviteData?.receiverEmail != null &&
        values.email != inviteData?.receiverEmail
      ) {
        setLoading(false);
        return generateNotification(
          "error",
          "Error",
          "Email does not match the one in invitation"
        );
      }
      handleSignIn(values.email, values.password)
        .then((user) => {
          console.log("Signed Up", user);
          let payload = {
            receiverId: user.uid,
            receiverEmail: user.email,
            status: "accepted",
            inviteBy: inviteData?.inviteBy,
            name: user.email?.split("@")[0],
          };

          // after signing in, check if the invite is an email invite
          if (inviteData?.inviteType === "email") {
            // if invite type is email then update the user status to accepted
            handleUpdateTeamMember(inviteId, {
              status: "accepted",
              receiverId: user.uid,
            }).then(() => {
              handleUpdateInviteStatus(inviteId, "accepted")
                .then((res) => {
                  // now check if there is a batonID
                  if (inviteData?.batonId) {
                    // if there is a batonID then update the baton

                    handleUpdateBaton(inviteData?.batonId, {
                      memberName: payload.receiverEmail?.split("@")[0],
                      memberId: payload.receiverId,
                      memberPostStatus: "received",
                      authorPostStatus: "passed",
                    })
                      .then((res) => {
                        setLoading(false);
                        if (!user.emailVerified) {
                          generateNotification(
                            "error",
                            "Verify Email",
                            "Kindly verify your email to continue"
                          );
                          return;
                        } else {
                          // if there is no batonID then just navigate to home
                          setIsLogin(user);
                          navigate("/");
                        }
                      })
                      .catch((ex) => {
                        console.log(ex.message);
                        generateNotification(
                          "error",
                          "Error",
                          "The Baton you are invited to is no created yet."
                        );
                        setIsLogin(user);
                        navigate("/");
                        setLoading(false);
                      });
                  } else {
                    // if there is no batonID then check if user is verified
                    setLoading(false);
                    if (!user.emailVerified) {
                      // if user is not verified then show error
                      generateNotification(
                        "error",
                        "Verify Email",
                        "Kindly verify your email to continue"
                      );
                      return;
                    } else {
                      // if user is verified then navigate to home
                      setIsLogin(user);
                      navigate("/");
                    }
                  }
                })
                .catch((ex) => {
                  generateNotification(
                    "error",
                    "Error",
                    "You are not added as the member of the team yet."
                  );
                  setIsLogin(user);
                  navigate("/");
                  setLoading(false);
                })
                .catch((ex) => {
                  generateNotification(
                    "error",
                    "Error",
                    "Failed to add you as the member."
                  );
                  setIsLogin(user);
                  navigate("/");
                  setLoading(false);
                });
            });
          } else {
            // then add the user to the team
            handleAddTeamMember(inviteId, payload)
              .then((res) => {
                console.log("Added Team Member", res);

                handleUpdateInviteStatus(inviteId, "accepted").then((res) => {
                  if (inviteData?.batonId) {
                    handleUpdateBaton(inviteData?.batonId, {
                      memberName: payload.receiverEmail?.split("@")[0],
                      memberId: payload.receiverId,
                      memberPostStatus: "received",
                      authorPostStatus: "passed",
                    })
                      .then((res) => {
                        setLoading(false);
                        if (!user.emailVerified) {
                          generateNotification(
                            "error",
                            "Verify Email",
                            "Kindly verify your email to continue"
                          );
                          return;
                        } else {
                          setIsLogin(user);
                          navigate("/");
                        }
                      })
                      .catch((ex) => {
                        generateNotification(
                          "error",
                          "Error",
                          "The Baton you are invited to is no created yet."
                        );
                        setIsLogin(user);
                        navigate("/");
                        setLoading(false);
                      });
                  } else {
                    setLoading(false);
                    if (!user.emailVerified) {
                      generateNotification(
                        "error",
                        "Verify Email",
                        "Kindly verify your email to continue"
                      );
                      return;
                    } else {
                      setIsLogin(user);
                      navigate("/");
                    }
                  }
                });

                // then update the baton
              })
              .catch((ex) => {
                generateNotification("error", "Error", ex.message);
                setLoading(false);
              });
          }
        })
        .catch((ex) => {
          generateNotification("error", "Error", ex.message);
          setLoading(false);
        });
    } else
      handleSignIn(values.email, values.password)
        .then((user) => {
          setLoading(false);
          if (!user.emailVerified) {
            generateNotification(
              "error",
              "Verify Email",
              "Kindly verify your email to continue"
            );
            return;
          } else {
            setIsLogin(user);
            navigate("/");
          }
        })
        .catch((ex) => {
          generateNotification("error", "Error", ex.message);
          setLoading(false);
        });
  };

  const handleForgotPress = () => {
    navigate("/forgotpassword");
    // handleForgotPassword("bilalnaeem166@gmail.com")
    //   .then(() => console.log("done"))
    //   .catch((ex) => console.log(ex));
  };

  const { Title } = Typography;

  return (
    <Container className="d-flex flex-column" style={{ height: "100vh" }}>
      <Container className="d-flex col-12 col-lg-7 mt-5 justify-content-center align-items-center">
        <div className="col-5 col-md-3">
          <img src={logo} style={{ width: "100%" }} />
        </div>
      </Container>
      <Container className="d-flex flex-column col-12 col-lg-7 mt-5 justify-content-center align-items-center">
        <Title level={1} className="mb-5">
          <ColoredTitle color="white">Welcome Back</ColoredTitle>
        </Title>
        <Form
          name="normal_login"
          className="login-form d-flex col-12 flex-column align-items-center"
          initialValues={{
            remember: true,
          }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            className="col-12"
            name="email"
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
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              autoComplete="off"
              style={{
                backgroundColor: focusedEmail ? "white" : "transparent",
                color: focusedEmail ? "black" : "white",
              }}
              onFocus={() => setFocusedEmail(true)}
              onBlur={() => setFocusedEmail(false)}
              disabled={inviteData?.receiverEmail ? true : false}
            />
          </Form.Item>

          <Form.Item
            className="col-12"
            name="password"
            rules={[
              {
                min: 6,
                message: "Password length should not be less than 6",
              },
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <FormPassword
              prefix={<LockOutlined className="site-form-item-icon" />}
              style={{
                backgroundColor: focusedPassword ? "white" : "transparent",
                color: focusedPassword ? "black" : "white",
              }}
              type="password"
              placeholder="Password"
              onFocus={() => setFocusedPassword(true)}
              onBlur={() => setFocusedPassword(false)}
            />
          </Form.Item>

          <Form.Item className="mt-4">
            {loading ? (
              <Loading size="large" color={colors.teal100} />
            ) : (
              <LoginButton
                htmlType="submit"
                bgcolor={colors.teal100}
                className="login-form-button px-5"
              >
                Log in
              </LoginButton>
            )}
            {/* Or <a href="">register now!</a> */}
          </Form.Item>

          <Form.Item>
            <ColoredTitle
              color={colors.teal100}
              textStyle="underline"
              onClick={handleForgotPress}
            >
              Forgot your password?
            </ColoredTitle>
          </Form.Item>

          <Form.Item>
            <ColoredTitle color="white">Don't have an Account?</ColoredTitle>
            {"    "}
            <ColoredTitle
              color={colors.teal100}
              textStyle="underline"
              onClick={() => {
                if (inviteId) navigate("/signup/" + inviteId);
                else navigate("/signup");
              }}
            >
              Sign Up
            </ColoredTitle>
          </Form.Item>
        </Form>
      </Container>
    </Container>
  );
}

// Componenets
const LoginButton = styledComponents(Button)`
        width: 300px;
        height: 50px;
        border-radius: 5px;
        color: ${(props) => (props.color ? props.color : "white")};
        border-color:${({ bgcolor, ...props }) => bgcolor};
        background-color:${({ bgcolor, ...props }) => bgcolor};
        :hover{
          color: ${({ bgcolor, ...props }) => bgcolor};
          border-color:${({ bgcolor, ...props }) => bgcolor};
        }
`;

const FormInput = styledComponents(Input)`
    width: 100%;
    height: 40px;
    input[type=email] {
      background-color: transparent;
      color: white;
    }
    input[type=email]:focus {
      background-color: white;
      color: black;
    }
    .ant-input[disabled] {
      background-color: transparent;
      color: white !important;
    }
   
`;
const FormPassword = styledComponents(Input.Password)`
    width: 100%;
    height: 40px;
    input[type=password] {
      background-color: transparent;
      color: white;
    }
    input[type=password]:focus {
      background-color: white;
      color: black;
    }
    
`;

const ColoredTitle = styledComponents.label`
    color: ${(props) => props.color};
    text-decoration:  ${(props) => props.textStyle};
    :hover{
      cursor: pointer;
    }

`;
