import React from "react";
import styledComponents from "styled-components";
import { batonsList } from "../../utilities/batonsList";
import { GrClose } from "react-icons/gr";
import { AiFillInfoCircle, AiFillCloseCircle } from "react-icons/ai";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";

export default function Alert({
  batonTitle = "Baton Title",
  batonName = "Baton Name",
  batonDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper quis lectus nulla at. Metus aliquam eleifend mi in nulla. Erat velit scelerisque in dictum. Sagittis vitae et leo duis ut diam.",
  batonType = "pending",
  className = "",
  onClose = () => {},
  onViewDetails = () => {},
}) {
  const { bgColor, borderColor } = batonsList[batonType];

  const getNotificationIcon = () => {
    switch (batonType) {
      case "received":
        return <AiFillInfoCircle size={18} color="white" />;
      case "complete":
        return <BsFillCheckSquareFill size={15} color="white" />;
      case "declined":
        return <AiFillCloseCircle size={18} color="white" />;
      case "accepted":
        return <IoMdExit size={18} color="white" />;
      default:
        return <AiFillInfoCircle size={18} color="white" />;
    }
  };

  return (
    <AlertContainer
      bordercolor={borderColor}
      bgcolor={bgColor}
      className={className}
    >
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row">
          <IconContainer bgcolor={borderColor}>
            {getNotificationIcon()}
          </IconContainer>
          <AlertTitle>{batonTitle}</AlertTitle>
        </div>
        <CloseIcon onClick={onClose} />
      </div>

      <BatonName>{batonName}</BatonName>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="col-10">
          <BatonDescription>{batonDescription}</BatonDescription>
        </div>
        <div>
          <ViewDetailButton
            bordercolor={borderColor}
            bgcolor={borderColor}
            onClick={onViewDetails}
          >
            View Details
          </ViewDetailButton>
        </div>
      </div>
    </AlertContainer>
  );
}

const AlertContainer = styledComponents.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${({ bgcolor }) => bgcolor};
    border: 1px solid ${({ bordercolor }) => bordercolor};
    border-radius: 5px;
    padding-left: 16px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.25);

`;

const AlertTitle = styledComponents.label`
    font-size: 16px;
    font-weight: bold;
    font-family: heebo;
    color: #000;
`;

const CloseIcon = styledComponents(GrClose)`
    color: #000;
    font-weight: bold;
    :hover {
        cursor: pointer;
    }
`;

const BatonName = styledComponents.label`
    font-size: 18px;
    font-family: heebo;
    color: #000;
    margin-top: 4px;
    margin-bottom: 4px;
`;

const BatonDescription = styledComponents.label`
    font-size: 16px;
    font-family: heebo;
    color: #000;
`;

const ViewDetailButton = styledComponents.button`
    font-size: 14px;
    font-family: heebo;
    color: #000;
    background-color: #fff;
    border: 1px solid ${({ bordercolor }) => bordercolor};
    border-radius: 4px;
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 3px;
    padding-bottom: 3px;
    transition: 0.3s;
    :hover {
        cursor: pointer;
        background-color: ${({ bgcolor }) => bgcolor};
        color: #fff;
    }
`;

const IconContainer = styledComponents.div`
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 13px;
    background-color: ${({ bgcolor }) => bgcolor};
    margin-right: 8px;

`;
