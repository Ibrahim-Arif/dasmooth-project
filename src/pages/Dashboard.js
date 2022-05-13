import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Collapseable } from "../components";
import { colors } from "../utilities/colors";

export default function Dashboard() {
  const [mode, setMode] = useState(1);
  return (
    <>
      <Container className="row mt-4">
        <Container className="col">
          <Container>
            <h4>Dashboard</h4>
            <Button
              style={{ backgroundColor: colors.teal100, color: "white" }}
              size="large"
              icon={<PlusOutlined />}
              // className="row align-items-center"
            >
              CREATE NEW
            </Button>
          </Container>

          <Container>
            <div className="mt-5">
              <Collapseable title="Pending Batons" count={1} />
            </div>
            <div className="mt-5">
              <Collapseable
                title="Passed Batons"
                count={4}
                borderColor="gold"
                bgColor="#faffb8"
              />
            </div>
          </Container>
        </Container>

        {/*  */}
        <Container className="col d-none d-lg-flex"></Container>
      </Container>
    </>
  );
}
