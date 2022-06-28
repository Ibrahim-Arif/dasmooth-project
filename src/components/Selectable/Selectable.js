import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { colors } from "../../utilities/colors";
import styledComponents from "styled-components";
import { DeleteFilled } from "@ant-design/icons";

export default function Selectable({
  icon,
  text,
  image = null,
  onItemPress = () => null,
  isItemActive,
  customColor = null,
  status = null,
  statusColor = colors.teal100,
}) {
  const passive = { color: colors.teal100, bgColor: colors.tealLight90 };
  const active = { color: "white", bgColor: colors.tealDark30 };
  const [activeColor, setActiveColor] = useState(passive);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => setIsActive(isItemActive), [isItemActive]);
  useEffect(
    () =>
      customColor
        ? setActiveColor(customColor)
        : isItemActive
        ? setActiveColor(active)
        : setActiveColor(passive),
    [isItemActive]
  );
  return (
    <CustomButton
      className={`row d-flex flex-row justify-content-center justify-content-md-start align-items-center py-2 mt-3`}
      color={activeColor.color}
      bgcolor={activeColor.bgColor}
      onClick={() => {
        setIsActive(!isActive);
        onItemPress();
      }}
    >
      <div className="d-flex flex-row justify-content-between">
        <Container
          className={`${
            status ? "col-8" : "col-12"
          } d-flex flex-row align-items-center`}
        >
          {image ? image : icon}
          <div className="me-3"></div>
          {text}
        </Container>
        {status && (
          <Container>
            <label style={{ color: statusColor }}>{`(${status})`}</label>
          </Container>
        )}
      </div>
    </CustomButton>
  );
}

const CustomButton = styledComponents.div`
    color: ${({ color }) => color};
    background-color:  ${({ bgcolor }) => bgcolor};
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    font-size: 18px;
    :hover{
        cursor: pointer;
    }
    @media screen and (max-width: 360px) {
          font-size: calc(13px + 1vw) !important;
        
      }
        
`;
