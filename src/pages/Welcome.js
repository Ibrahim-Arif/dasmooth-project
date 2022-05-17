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
        <div className="col-6 col-md-4">
          <img src={placeHolder} style={{ width: "100%" }} />
        </div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ color: "white", marginTop: 20 }}
        >
          <h6
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "calc(12px + 1vw)",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum
          </h6>
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
