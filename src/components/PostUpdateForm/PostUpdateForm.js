import React, { useState } from "react";
import { Input } from "antd";
import { Container } from "react-bootstrap";
import { TealButton } from "../FormButton/FormButton";

export default function PostUpdateForm({
  itemSelected,
  setItemSelected,
  clickOk,
}) {
  const [value, setValue] = useState(itemSelected);
  function onChange(e) {
    console.log("changed", e.target.value);
    setValue(e.target.value);
  }
  return (
    <Container className="mt-3">
      <Input
        onChange={onChange}
        style={{ borderRadius: 5, width: "100%" }}
        size="large"
        value={value}
      />
      <TealButton
        className="col-12"
        onClick={() => {
          setItemSelected(value);
          clickOk();
        }}
      >
        POST UPDATE
      </TealButton>
    </Container>
  );
}
