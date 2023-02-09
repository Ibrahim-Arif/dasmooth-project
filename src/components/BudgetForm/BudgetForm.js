import React, { useState } from "react";
import { Input, InputNumber } from "antd";
import { Checkbox } from "antd";
import { Container } from "react-bootstrap";
import { TealButton } from "../FormButton/FormButton";
import styled from "styled-components";
import { colors } from "../../utilities/colors";

export default function BudgetForm({ itemSelected, setItemSelected, clickOk }) {
  const [value, setValue] = useState(itemSelected);

  function onChange(value) {
    // console.log("changed", value);
    setValue(value);
  }
  return (
    <Container className="d-flex flex-column mt-3">
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
        disabled={value == "N/A" ? true : false}
      />
      <CustomCheckbox
        onChange={(e) => (e.target.checked ? setValue("N/A") : setValue("0"))}
        checked={value == "N/A" ? true : false}
        style={{ transform: "scale(1.3)" }}
        className="my-3 align-self-center"
        color={colors.mosque}
      >
        N/A
      </CustomCheckbox>
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

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${(props) => props.color};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.color};
    border-color: ${(props) => props.color};
  }
`;
