import { CloseCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

export default function ImagePicker({
  setItems,
  item = false,
  index,
  items = [],
  className
}) {
  const handleImageSelection = () =>
    document.getElementById(`imageInput${index}`).click();

  const [isSelected, setIsSelected] = useState(false);
  const [mouseHover, setMouseHover] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files;
    const fileSize = file[0].size / 1024 / 1024;
    if (fileSize > 1) {
     
      return;
    } else {
      let temp = URL.createObjectURL(file[0]);
      setItems(temp);
      setIsSelected(true);
    }
  };
  const handleCrossClick = () => {
    let temp = "";
    setItems(temp);
    setIsSelected(false);
  };

  useEffect(() => {
    if (item) setIsSelected(true);
  }, [item]);

  return (
    <PickerContainer
      onClick={isSelected ? handleCrossClick : handleImageSelection}
      bordered={item == null || item == ""}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      className={className}
    >
      <input
        type="file"
        onChange={handleChange}
        accept="image/*"
        style={{ display: "none" }}
        id={`imageInput${index}`}
      />
      {item ? (
        <>
          <img
            src={item}
            height="100%"
            width="100%"
            style={{ objectFit: "contain" }}
          />
          {isSelected && mouseHover && (
            <DeSelectButton>
               <CloseCircleFilled/>
            </DeSelectButton>
          )}
        </>
      ) : (
      <PlusCircleOutlined/>
      )}
    </PickerContainer>
  );
}

const PickerContainer = styled.div`
    min-height: 80px;
    min-width: 80px;
    max-width: 160px;
    max-height: 160px;
    // border-radius: 50%;
    overflow: hidden;
    margin: 5px;
    border: ${({ bordered }) => bordered && "1px dashed grey"};
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    :hover{
        cursor: pointer;
    }

`;

const DeSelectButton = styled.div`
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: tomato;
    display: flex;
    justify-content:center;
    align-items:center;
    position: absolute;
`;
