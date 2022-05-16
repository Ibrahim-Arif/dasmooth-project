import React, { useEffect, useState } from "react";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { colors } from "../../utilities/colors";
import Collapseable from "../Collapseable/Collapseable";
import { useUser } from "../../hooks/useContext";
import { useNavigate } from "react-router";

export default function DashboardView(props) {
  const { batonsData } = useUser();
  const [pendingBatons, setPendingBatons] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(batonsData);
    setPendingBatons(batonsData);
  }, [batonsData]);
  return (
    <>
      <Container className="col-12">
        <h4>Dashboard</h4>
        <Button
          style={{
            backgroundColor: colors.tealDark30,
            color: "white",
            width: 220,
            height: 50,
            borderRadius: 5,
          }}
          size="large"
          icon={<PlusOutlined />}
          className="d-flex flex-row align-items-center"
          onClick={() => navigate("/dashboard/batonsForm")}
        >
          CREATE A NEW BATON
        </Button>
      </Container>
      {/* Batons Container */}
      <Container>
        <div className="mt-5">
          <Collapseable title="Pending Batons" batonsData={pendingBatons} />
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
