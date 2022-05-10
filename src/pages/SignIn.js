import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";

import styledComponents from "styled-components";
import { colors } from "../utilities/colors";

export default function SignIn() {
  const [mode, setMode] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.getElementById("root").style.backgroundColor = colors.cg100;
  }, []);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (mode) {
      alert("signUp");
    } else {
      console.log("Received values of form: ", values);
      navigate("/dashboard");
    }
  };

  const handleForgotPress = () => {
    alert("forgot");
  };

  const { Title } = Typography;

  return (
    <Container className="d-flex flex-row " style={{ height: "100vh" }}>
      <Container className="d-md-flex d-none justify-content-center align-items-center">
        <h1>Logo</h1>
      </Container>
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <Title level={1} className="mb-5">
          <ColoredTitle color="white">
            {/* {!mode ? "Sign In" : "Sign Up"} */}
            Welcome Back
          </ColoredTitle>
        </Title>
        <Form
          name="normal_login"
          className="login-form d-flex flex-column align-items-center"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
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
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { min: 6, message: "Password length should not be less than 6" },
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <FormPassword
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="mt-4">
            <LoginButton
              htmlType="submit"
              bgColor={colors.teal100}
              className="login-form-button px-5"
            >
              {!mode ? "Log in" : "Sign up"}
            </LoginButton>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
          {!mode ? (
            <>
              <Form.Item>
                <ColoredTitle
                  color={colors.teal100}
                  textStyle="underline"
                  onClick={handleForgotPress}
                >
                  Forgot your password?
                </ColoredTitle>
              </Form.Item>
            </>
          ) : null}
          <Form.Item>
            <ColoredTitle color="white">
              {!mode ? "Don't have an Account? " : "Already have an account? "}
            </ColoredTitle>
            {"    "}
            <ColoredTitle
              color={colors.teal100}
              textStyle="underline"
              onClick={() => {
                setMode(!mode);
                form.resetFields();
              }}
            >
              {!mode ? "Sign Up" : "Log In"}
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
        height: 40px;
        color: ${(props) => (props.color ? props.color : "white")};
        border-color:${(props) => props.bgColor};
        background-color:${(props) => props.bgColor};
        :hover{
          color: ${(props) => props.bgColor};
          border-color:${(props) => props.bgColor};
        }
`;

const FormInput = styledComponents(Input, Input.Password)`
    width: 300px;
    height: 40px;
`;
const FormPassword = styledComponents(Input.Password)`
    width: 300px;
    height: 40px;
`;

const ColoredTitle = styledComponents.label`
    color: ${(props) => props.color};
    text-decoration:  ${(props) => props.textStyle};
    :hover{
      cursor: pointer;
    }

`;
