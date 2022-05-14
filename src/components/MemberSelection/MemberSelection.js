import React, { useState } from "react";
import { Input, Button, Avatar } from "antd";
import { colors } from "../../utilities/colors";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import FormItemSelect from "../FormItemSelect";

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
        <FormItemSelect
          icon={<PlusOutlined />}
          text="Invite team member by email or text message"
          isItemActive={false}
          customColor={{ color: colors.teal100, bgColor: colors.cgLight95 }}
        />
        <FormItemSelect
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
        <FormItemSelect
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
      <Button
        onClick={() => {
          setItemSelected({
            text: currentItem.text,
            image: currentItem.image,
            icon: currentItem.icon,
          });
          clickOk();
        }}
        style={{
          marginTop: 16,
          backgroundColor: colors.teal100,
          color: "white",
          fontWeight: "bold",
          height: 50,
        }}
        className="col-12"
      >
        SELECT TEAM MEMBER
      </Button>
    </>
  );
}
