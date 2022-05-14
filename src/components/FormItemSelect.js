import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import styledComponents from "styled-components";
import { colors } from "../utilities/colors";

export default function FormItemSelect({
  icon,
  text,
  image = null,
  onItemPress = () => null,
  isItemActive,
  customColor = null,
}) {
  const passive = { color: colors.teal100, bgColor: colors.tealLight90 };
  const active = { color: "white", bgColor: colors.teal100 };
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
      <Container className="col-12 d-flex flex-row ">
        <div className="me-3">{image ? image : icon}</div>
        {text}
      </Container>
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
