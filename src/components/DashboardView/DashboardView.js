import React from "react";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { colors } from "../../utilities/colors";
import Collapseable from "../Collapseable/Collapseable";

export default function DashboardView(props) {
  return (
    <>
      <Container className="col-12">
        <h4>Dashboard</h4>
        <Button
          style={{ backgroundColor: colors.teal100, color: "white" }}
          size="large"
          icon={<PlusOutlined />}
          className="d-flex flex-row align-items-center"
          onClick={() => props.setMode(1)}
        >
          CREATE NEW
        </Button>
      </Container>
      {/* Batons Container */}
      <Container>
        <div className="mt-5">
          <Collapseable title="Pending Batons" count={1} />
        </div>
        <div className="mt-5">
          <Collapseable
            title="Passed Batons"
            count={4}
            borderColor="#EFB029"
            bgColor="#FDF7E6"
          />
        </div>
      </Container>
    </>
  );
}
