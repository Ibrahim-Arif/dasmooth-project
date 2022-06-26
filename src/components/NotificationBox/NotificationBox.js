import React from "react";
import styled from "styled-components";

export default function NotificationBox({ text = "You deleted this on" }) {
  return (
    <GrayBox
      className="col-12 d-flex justify-content-center align-items-center"
      bgcolor="#cccccc"
    >
      <p>{text}</p>
    </GrayBox>
  );
}

const GrayBox = styled.div`
  background-color: ${({ bgcolor }) => bgcolor};
  color: black;
  border-radius: 15px;
  height: 50px;
`;
