import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router";

import styledComponents from "styled-components";
import { colors } from "../utilities/colors";
import { logo } from "../assets";
import {
  handleForgotPassword,
  handleGetInvite,
  handleGetTeamMember,
  handleSignUp,
} from "../services";
import { generateNotification } from "../utilities/generateNotification";
import { Loading } from "../components";
import { useUser } from "../hooks/useContext";
import { handleSignIn } from "../services/handleSignIn";
import { useCheckSignIn } from "../hooks/useCheckSignIn";

export default function Invite() {
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inviteData, setInviteData] = useState();
  const { setIsLogin } = useUser();

  useCheckSignIn();
  const navigate = useNavigate();
  const location = useLocation();
  const { inviteId } = useParams();

  useEffect(() => {
    if (!inviteId) {
      navigate("/");
    }
    // console.log(location.pathname);
    // console.log(inviteId);
    // return;
    handleGetInvite(inviteId)
      .then((data) => {
        console.log(data);
        if (data) {
          console.log(data);
          setInviteData(data);
        } else {
          generateNotification("error", "Error", "Invalid Invitation");
          // navigate("/");
        }
      })
      .catch((ex) => {
        generateNotification("error", "Error", "Invalid Invitation");
        // navigate("/");
      });
    document.getElementById("body").style.backgroundColor = colors.htmlColor;
  }, []);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    // if (mode) {
    //   handleSignUp(values.email, values.password)
    //     .then((user) => {
    //       navigate("/verifyEmail");
    //       // generateNotification(
    //       //   "success",
    //       //   "Registered",
    //       //   `An email has been sent to ${values.email}. Kindly check your email! If you do not see any email, check your spam section`
    //       // );
    //       setLoading(false);
    //     })
    //     .catch((ex) => {
    //       generateNotification("error", "Error", ex.message);
    //       setLoading(false);
    //     });
    // } else {
    //   setLoading(true);
    //   handleSignIn(values.email, values.password)
    //     .then((user) => {
    //       setLoading(false);
    //       if (!user.emailVerified) {
    //         generateNotification(
    //           "error",
    //           "Verify Email",
    //           "Kindly verify your email to continue"
    //         );
    //         return;
    //       } else {
    //         localStorage.setItem("uid", user.uid);
    //         setIsLogin(user);
    //         navigate("/");
    //       }
    //     })
    //     .catch((ex) => {
    //       generateNotification("error", "Error", ex.message);
    //       setLoading(false);
    //     });
    // }
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
          <ColoredTitle color="white">Invitation to Join</ColoredTitle>
        </Title>
        <Form
          name="normal_login"
          className="login-form d-flex col-12 flex-column align-items-center"
          initialValues={{
            remember: true,
          }}
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
                Join
              </LoginButton>
            )}
            {/* Or <a href="">register now!</a> */}
          </Form.Item>

          <Form.Item>
            <ColoredTitle color="white">Already have an account?</ColoredTitle>

            <ColoredTitle
              color={colors.teal100}
              textStyle="underline"
              onClick={() => {
                form.resetFields();
                navigate("/signIn");
              }}
              className="ms-2"
            >
              Log In
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
