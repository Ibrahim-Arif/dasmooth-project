import React from "react";
import styled from "styled-components";
import { colors } from "../../utilities/colors";

export default function NotificationBox({ text = "You deleted this on" }) {
  return (
    <GrayBox
      className="col-12 d-flex p-3 justify-content-center my-4"
      bgcolor={colors.cgLight80}
    >
      <label style={{ color: colors.dashboardText, fontSize: 16 }}>
        {text}
      </label>
    </GrayBox>
  );
}

const GrayBox = styled.div`
  background-color: ${({ bgcolor }) => bgcolor};
  color: black;
  border-radius: 15px;
  // height: 50px;
`;
