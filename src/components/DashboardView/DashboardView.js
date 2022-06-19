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

export default function DashboardView(props) {
  const { batonsData, batons, setBatons } = useUser();
  const [PendingBatons, setPendingBatons] = useState([]);
  const [PassedBatons, setPassedBatons] = useState([]);
  const [ReceivedBatons, setReceivedBatons] = useState([]);
  const [DeclinedBatons, setDeclinedBatons] = useState([]);
  const [AcceptedBatons, setAcceptedBatons] = useState([]);
  const [CompleteBatons, setCompleteBatons] = useState([]);

  const navigate = useNavigate();

  const statuses = ["pending", "passed", "received", "declined", "complete"];

  const filterBatonsData = (status) => {
    let filtered = batonsData.filter((e) => e.status == status);
    return filtered;
  };

  const filterBatons = (batonData,batonName) => {
    
    
    console.log(`${batonName} filter`,batonData.length);
    if (batonData.length == 0) {
      console.log(`removing the ${batonName} btaon back in array`)
      var filteredBatons = batonsList.filter(e=>e.status == batonName)
      setBatons(filteredBatons)
    }else if(batonData.length > 0){
      console.log(`adding the ${batonName} btaon back in array`)
       let temp = batonsList.filter(e=>e.status == batonName)
       let tempBatons = batons;

      console.log(temp,batonData)
      tempBatons.push(temp[0])
      setBatons(tempBatons)
    }
  };

  useEffect(() => {
    console.log("DashBoardView");
    batonsData.forEach((e) => console.log(e.title, "|", e.docId));

    let pending = filterBatonsData("pending");
    filterBatons(pending,"pending");
    setPendingBatons(pending);

    let passed = filterBatonsData("passed");
    filterBatons(passed,"passed");
    setPassedBatons(passed);

    let received = filterBatonsData("recieved");
    filterBatons(received,"received");
    setReceivedBatons(received);

    let accepted = filterBatonsData("accepted");
    filterBatons(accepted,"accepted");
    setDeclinedBatons(accepted);

    let declined = filterBatonsData("declined");
    filterBatons(declined,"declined");
    setDeclinedBatons(declined);

    let complete = filterBatonsData("complete");
    filterBatons(complete,"complete");
    setCompleteBatons(complete);

    console.log(batons)
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
