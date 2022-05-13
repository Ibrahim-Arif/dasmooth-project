import React, { useState } from "react";

import { Container } from "react-bootstrap";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileAddOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import { DashboardView, FormItemSelect } from "../components";
import { colors } from "../utilities/colors";

import "./dashboard.css";
export default function Dashboard() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Container className="row mt-4">
        <Container className="col">
          {mode === 0 ? (
            <DashboardView setMode={setMode} />
          ) : (
            <>
              <Container className="col">
                <FormItemSelect
                  icon={<UserOutlined />}
                  text=" Select a team member"
                />
                <FormItemSelect
                  icon={<CalendarOutlined />}
                  text=" Set a deadline"
                />
                <FormItemSelect
                  icon={<DollarOutlined />}
                  text=" Set a budget"
                />
                <FormItemSelect
                  icon={<FileAddOutlined />}
                  text=" Attach a file"
                />
                <FormItemSelect
                  icon={<FileTextOutlined />}
                  text=" Post an Update"
                />
              </Container>
            </>
          )}
        </Container>

        {/*  */}
        <Container className="col d-none d-lg-flex">
          {/* {mode == 1 ? } */}
        </Container>
      </Container>
    </>
  );
}
