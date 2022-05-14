import React, { useState } from "react";
import { Input, Avatar } from "antd";
import { colors } from "../../utilities/colors";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import Selectable from "../Selectable/Selectable";

export default function MemberSelection({
  itemSelected,
  setItemSelected,
  clickOk,
}) {
  const [currentItem, setCurrentItem] = useState({
    text: "Select a team member",
    icon: <UserOutlined />,
    image: null,
  });
  return (
    <>
      <Input
        placeholder="Search by name or email"
        size="large"
        style={{ borderRadius: 5, width: "100%" }}
      />
      <div className="px-3">
        <Selectable
          icon={<PlusOutlined />}
          text="Invite team member by email or text message"
          isItemActive={false}
          customColor={{ color: colors.teal100, bgColor: colors.cgLight95 }}
        />
        <Selectable
          onItemPress={() => {
            setCurrentItem({
              text: "Oswaldo Mondenza",
              image: <Avatar src="https://joeschmoe.io/api/v1/random" />,
            });
          }}
          image={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          text="Oswaldo Mondenza"
          isItemActive={currentItem.text === "Oswaldo Mondenza" ? true : false}
        />
        <Selectable
          image={
            <Avatar style={{ backgroundColor: colors.teal100 }}>LW</Avatar>
          }
          text="Lynda Well"
          isItemActive={currentItem.text === "Lynda Well" ? true : false}
          onItemPress={() => {
            setCurrentItem({
              text: "Lynda Well",
              image: <Avatar>LW</Avatar>,
            });
          }}
        />
        {/* <FormItemSelect
          image={<Avatar style={{ position: "absolute" }}>JW</Avatar>}
          text="James White"
          isItemActive={false}
        /> */}
      </div>
      <TealButton
        onClick={() => {
          setItemSelected({
            text: currentItem.text,
            image: currentItem.image,
            icon: currentItem.icon,
          });
          clickOk();
        }}
        className="col-12"
      >
        SELECT TEAM MEMBER
      </TealButton>
    </>
  );
}
