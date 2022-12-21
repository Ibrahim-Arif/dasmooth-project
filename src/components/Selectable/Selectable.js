import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { colors } from "../../utilities/colors";
import styledComponents from "styled-components";
// import { DeleteFilled } from "@ant-design/icons";
import { HiPencil } from "react-icons/hi";

export default function Selectable({
  icon,
  text,
  image = null,
  onItemPress = () => null,
  isItemActive,
  customColor = null,
  status = null,
  statusColor = colors.teal100,
  isEditable = false,
  animation = false,
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
      className={`row d-flex flex-row justify-content-center justify-content-md-start align-items-center py-2 mt-3 px-2 px-sm-0`}
      color={activeColor.color}
      bgcolor={activeColor.bgColor}
      bordercolor={active.bgColor}
      hoverbgcolor={active.bgColor}
      hovercolor={active.color}
      transition={animation}
      onClick={() => {
        setIsActive(!isActive);
        onItemPress();
      }}
    >
      <div className="d-flex flex-row justify-content-between px-0">
        <Container
          className={`${
            status ? "col-7" : isEditable && isItemActive ? "col-11" : "col-12"
          } d-flex flex-row align-items-center px-1 px-md-3 `}
        >
          <AssetContainer>{image ? image : icon}</AssetContainer>
          {/* <div></div> */}
          <label className="ms-2" style={{ fontFamily: "heebo" }}>
            {text}
          </label>
        </Container>

        {status && (
          <Container>
            <StatusText id="status-text" color={statusColor}>{`${
              status.charAt(0).toUpperCase() + status.slice(1)
            }`}</StatusText>
          </Container>
        )}

        {isEditable && isItemActive && (
          <Container className="col-1 d-flex justify-content-center align-items-center px-0">
            <HiPencil size={18} color="white" />
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
    max-width: 100%;
    margin: 0px;
    border-radius: 5px;
    border: 1px solid  ${({ bordercolor }) => bordercolor};
    box-shadow: 0px 2px 3px 0px rgb(0 0 0 / 0.25);
    font-size: 18px;
    transition: ${({ transition }) =>
      transition ? "all 0.3s ease-in-out" : "none"};
    :hover{
        cursor: pointer;
        background-color: ${({ hoverbgcolor }) => hoverbgcolor};
        color: ${({ hovercolor }) => hovercolor};
    }
    :hover #status-text { color: #fff; }
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

const StatusText = styledComponents.label`
  color: ${({ color }) => color};
  font-size: 14px;
  font-family: heebo;
  
`;

const AssetContainer = styledComponents.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  `;
