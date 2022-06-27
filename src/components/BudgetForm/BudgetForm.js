import React, { useState } from "react";
import { Input, InputNumber } from "antd";
import { Checkbox } from 'antd';
import { Container } from "react-bootstrap";
import { TealButton } from "../FormButton/FormButton";

export default function BudgetForm({ itemSelected, setItemSelected, clickOk }) {
  const [value, setValue] = useState(itemSelected);
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
        value={value != "N/A" ? value : 0}
      />
      <Checkbox onChange={(e)=>e.target.checked ? setValue("N/A") : setValue("Set a budget")} checked={value == "N/A" ? true:false}>N/A</Checkbox>
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
