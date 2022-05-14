import React, { useState } from "react";
import { Input, InputNumber } from "antd";
import { Container } from "react-bootstrap";
import { TealButton } from "../FormButton/FormButton";

export default function BudgetForm({ itemSelected, setItemSelected, clickOk }) {
  const [value, setValue] = useState("Set a budget");
  function onChange(value) {
    console.log("changed", value);
    setValue(value);
  }
  return (
    <Container className="mt-3">
      <InputNumber
        defaultValue={0.0}
        formatter={(value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        onChange={onChange}
        style={{ borderRadius: 5, width: "100%" }}
        size="large"
      />
      <TealButton
        className="col-12"
        onClick={() => {
          setItemSelected(value);
          clickOk();
        }}
      >
        ADD BUDGET
      </TealButton>
    </Container>
  );
}
