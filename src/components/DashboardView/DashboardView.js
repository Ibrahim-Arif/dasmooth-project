import React, { useEffect, useState } from "react";

import { Button, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { colors } from "../../utilities/colors";
import Collapseable from "../Collapseable/Collapseable";
import { useUser } from "../../hooks/useContext";
import { useNavigate } from "react-router";

import ReactDragListView from "react-drag-listview";

export default function DashboardView(props) {
  const { batonsData, batons, setBatons } = useUser();
  const [PendingBatons, setPendingBatons] = useState([]);
  const [PassedBatons, setPassedBatons] = useState([]);
  const [ReceivedBatons, setReceivedBatons] = useState([]);
  const [DeclinedBatons, setDeclinedBatons] = useState([]);
  const [AcceptedBatons, setAcceptedBatons] = useState([]);
  const [CompleteBatons, setCompleteBatons] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("DashBoardView");
    batonsData.forEach((e) => console.log(e.title, "|", e.id));
    let pending = batonsData.filter((e) => e.status == "pending");
    setPendingBatons(pending);
  }, [batonsData]);

  const getBaton = {
    PendingBatons,
    PassedBatons,
    ReceivedBatons,
    DeclinedBatons,
    AcceptedBatons,
    CompleteBatons,
  };

  const onDragEnd = (fromIndex, toIndex) => {
    if (toIndex < 0) return; // Ignores if outside designated area

    const items = [...batons];
    const item = items.splice(fromIndex, 1)[0];
    items.splice(toIndex, 0, item);
    setBatons(items);
  };

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
        <ReactDragListView
          nodeSelector=".ant-list-item.draggble"
          handleSelector=".bars-icon"
          onDragEnd={onDragEnd}
        >
          <List
            dataSource={batons}
            renderItem={(e) => (
              <List.Item className="col-12 mt-5 draggble">
                <Collapseable
                  title={e.title}
                  batonsData={getBaton[e.title.replace(/\s+/g, "")]}
                  bgColor={e.bgColor}
                  borderColor={e.borderColor}
                  className="col-12"
                />
              </List.Item>
            )}
          />
        </ReactDragListView>
      </Container>
    </>
  );
}
