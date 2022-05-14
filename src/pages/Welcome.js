import React, { useEffect } from "react";
import { Button } from "antd";

import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

import styledComponents from "styled-components";
import { colors } from "../utilities/colors";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = colors.htmlColor;
  }, []);

  return (
    <Container className="d-flex flex-column" style={{ height: "100vh" }}>
      <Container className="d-flex mt-5 justify-content-center align-items-center">
        <h1>Logo</h1>
      </Container>
      <Container className="d-flex flex-column col-12 col-lg-7 mt-5 justify-content-center align-items-center">
        <div style={{ height: 150, width: 150, backgroundColor: "white" }}>
          Image
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 150, color: "white" }}
        >
          <h5>Text here</h5>
        </div>
        <LoginButton
          htmlType="submit"
          bgColor={colors.teal100}
          className="login-form-button px-5 mt-3"
          onClick={() => navigate("/signIn/1")}
        >
          SIGNUP TODAY!
        </LoginButton>
        <div className="mt-3">
          <ColoredTitle color="white">Already have an account?</ColoredTitle>
          {"    "}
          <ColoredTitle
            color={colors.teal100}
            textStyle="underline"
            onClick={() => navigate("/signIn")}
          >
            Log In
          </ColoredTitle>
        </div>
      </Container>
    </Container>
  );
}

// Componenets
const LoginButton = styledComponents(Button)`
        width: 300px;
        height: 40px;
        color: ${(props) => (props.color ? props.color : "white")};
        border-color:${({ bgColor, ...props }) => bgColor};
        background-color:${({ bgColor, ...props }) => bgColor};
        :hover{
          color: ${({ bgColor, ...props }) => bgColor};
          border-color:${({ bgColor, ...props }) => bgColor};
        }
`;

const ColoredTitle = styledComponents.label`
    color: ${(props) => props.color};
    text-decoration:  ${(props) => props.textStyle};
    :hover{
      cursor: pointer;
    }

`;
