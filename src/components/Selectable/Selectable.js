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
  const passive = {
    // color: colors.teal100,
    // bgColor: colors.tealLight90
    color: "#00685e",
    bgColor: "#f2f9f8",
  };
  const active = {
    // color: "white",
    //  bgColor: colors.tealDark30,
    color: "#f2f9f8",
    bgColor: "#00685e",
  };

  const disabled = {
    color: "#99999",
    bgColor: "#e2e2e2",
  };
  const [activeColor, setActiveColor] = useState(passive);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => setIsActive(isItemActive), [isItemActive]);

  useEffect(
    // () =>
    //   customColor
    //     ? setActiveColor(customColor)
    //     : isItemActive
    //     ? setActiveColor(active)
    //     : setActiveColor(passive),
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
      bordercolor={active.bgColor}
      hoverbgcolor={active.bgColor}
      hovercolor={active.color}
      onClick={() => {
        setIsActive(!isActive);
        onItemPress();
      }}
    >
      <div className="d-flex flex-row justify-content-between px-0">
        <Container
          className={`${
            status ? "col-7" : "col-12"
          } d-flex flex-row align-items-center px-1 px-md-3`}
        >
          {image ? image : icon}
          <div className="me-3"></div>
          {text}
        </Container>
        {status && (
          <Container>
            <label
              style={{ color: isActive ? activeColor.color : statusColor }}
            >{`${status.charAt(0).toUpperCase() + status.slice(1)}`}</label>
          </Container>
        )}
      </div>
    </CustomButton>
  );
}

const CustomButton = styledComponents.div`
    color: ${({ color }) => color};
    background-color:  ${({ bgcolor }) => bgcolor};
    min-height: 44px;
    min-width: 400px;
    border-radius: 5px;
    border: 1px solid  ${({ bordercolor }) => bordercolor};
    box-shadow: 0px 2px 3px 0px rgb(0 0 0 / 0.25);
    font-size: 18px;
    transition: all 0.3s ease-in-out;
    :hover{
        cursor: pointer;
        background-color: ${({ hoverbgcolor }) => hoverbgcolor};
        color: ${({ hovercolor }) => hovercolor};
    }
    :active{
        cursor: pointer;
        background-color: ${({ hoverbgcolor }) => hoverbgcolor};
        color: ${({ hovercolor }) => hovercolor};
        box-shadow: inset 0px 4px 6px 0px rgb(0 0 0 / 0.4);
    }
    @media screen and (max-width: 360px) {
          font-size: calc(13px + 1vw) !important;
        
      }
        
`;
