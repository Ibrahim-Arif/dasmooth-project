import React, { useEffect, useMemo, useState } from "react";
import { Button, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { colors } from "../../utilities/colors";
import Collapseable from "../Collapseable/Collapseable";
import { useUser } from "../../hooks/useContext";
import { useNavigate } from "react-router";

import ReactDragListView from "react-drag-listview";
import { batonsList } from "../../utilities/batonsList";
import { filterBatonsData } from "../../utilities/filterBatonsData";

export default function DashboardView(props) {
  const { batonsData, batons, setBatons } = useUser();
  const [PendingBatons, setPendingBatons] = useState([]);
  const [PassedBatons, setPassedBatons] = useState([]);
  const [ReceivedBatons, setReceivedBatons] = useState([]);
  const [DeclinedBatons, setDeclinedBatons] = useState([]);
  const [AcceptedBatons, setAcceptedBatons] = useState([]);
  const [CompleteBatons, setCompleteBatons] = useState([]);
  const [activeBatons, setActiveBatons] = useState(Object.values(batons));

  const navigate = useNavigate();

  const statuses = ["pending", "passed", "received", "declined", "complete"];

  const filterBatons = (batonData, batonName) => {
    // console.log(batonsList)
    if (batonData.length == 0) {
      console.log(`removing the ${batonName} btaon back in array`);
      let temp = batons;
      delete temp[batonName];
      setBatons(temp);
      setActiveBatons(Object.values(temp));
    } else if (batonData.length > 0) {
      console.log(`adding the ${batonName} btaon back in array`);
      let temp = batons;
      temp[batonName] = batonsList[batonName];
      // console.log(batonsList)
      setBatons(temp);
      temp = Object.values(temp);
      setActiveBatons(Object.values(temp));
    }
  };

  useEffect(() => {
    console.log("DashBoardView");
    batonsData.forEach((e) => console.log(e.title, "|", e.docId));

    let pending = filterBatonsData(batonsData, "pending");
    filterBatons(pending, "pending");
    setPendingBatons(pending);

    let passed = filterBatonsData(batonsData, "passed");
    filterBatons(passed, "passed");
    setPassedBatons(passed);

    let received = filterBatonsData(batonsData, "recieved");
    filterBatons(received, "received");
    setReceivedBatons(received);

    let accepted = filterBatonsData(batonsData, "accepted");
    filterBatons(accepted, "accepted");
    setDeclinedBatons(accepted);

    let declined = filterBatonsData(batonsData, "declined");
    filterBatons(declined, "declined");
    setDeclinedBatons(declined);

    let complete = filterBatonsData(batonsData, "complete");
    console.log("coomp", complete);
    filterBatons(complete, "complete");
    setCompleteBatons(complete);

    console.log(batons);
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
          onClick={() => navigate("/batonsForm")}
        >
          CREATE A NEW BATON
        </Button>
      </Container>
      {/* Batons Container */}
      {batonsData.length > 0 && (
        <Container>
          <ReactDragListView
            nodeSelector=".ant-list-item.draggble"
            handleSelector=".bars-icon"
            onDragEnd={onDragEnd}
          >
            <List
              dataSource={activeBatons}
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
      )}
    </>
  );
}
