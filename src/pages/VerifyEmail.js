import React, { useEffect } from "react";
import { Button, Typography } from "antd";

import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

import styledComponents from "styled-components";
import { colors } from "../utilities/colors";
import { logo } from "../assets";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.getElementById("body").style.backgroundColor = colors.htmlColor;
  }, []);

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
          <ColoredTitle color="white">Verify Email</ColoredTitle>
        </Title>
        <div className="login-form d-flex col-12 flex-column align-items-center">
          <ColoredTitle
            color="white"
            style={{ fontSize: "1.5rem", textAlign: "center" }}
          >
            A verification email has been sent to your email, Kindly check you
            email.
          </ColoredTitle>
          <div className="d-flex flex-row mt-4" style={{ fontSize: "0.9rem" }}>
            <ColoredTitle color="white">Verified your account?</ColoredTitle>
            <ColoredTitle
              color={colors.teal100}
              textStyle="underline"
              onClick={() => {
                navigate("/signIn");
              }}
              className="ms-2"
            >
              Sign In
            </ColoredTitle>
          </div>
        </div>
      </Container>
    </Container>
  );
}

const ColoredTitle = styledComponents.label`
    color: ${(props) => props.color};
    text-decoration:  ${(props) => props.textStyle};
    :hover{
      cursor: pointer;
    }

`;
