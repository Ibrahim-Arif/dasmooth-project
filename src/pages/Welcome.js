import React, { useEffect } from "react";
import { Button } from "antd";

import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

import styledComponents from "styled-components";
import { colors } from "../utilities/colors";
import { placeHolder } from "../assets";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("body").style.backgroundColor = colors.htmlColor;
  }, []);

  return (
    <Container className="d-flex flex-column mb-5">
      <Container className="d-flex mt-5 justify-content-center align-items-center">
        <h1 style={{ color: "white" }}>Logo</h1>
      </Container>
      <Container className="d-flex flex-column col-12 col-lg-7 mt-5 justify-content-center align-items-center">
        <div className="col-12 col-md-6">
          <img src={placeHolder} style={{ width: "100%" }} />
        </div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ color: "white", margin: 20 }}
        >
          <h5 style={{ color: "white", textAlign: "center" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </h5>
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
          <ColoredTitle color="white" style={{ fontSize: 16 }}>
            Already have an account?
          </ColoredTitle>

          <ColoredTitle
            color={colors.teal100}
            style={{ marginLeft: 10 }}
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
        height: 50px;
        border-radius: 5px;
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
