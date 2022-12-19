// import { EllipsisOutlined, DeleteFilled } from "@ant-design/icons";
// import { Dropdown, Menu } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import { useUser } from "../hooks/useContext";
// import { Avatar, List } from "antd";
// import { colors } from "../utilities/colors";
import { MemberSelection } from "../components";
// import { useCheckSignIn } from "../hooks/useCheckSignIn";

export default function TeamMembers() {
  // useCheckSignIn();
  const { teamMembers, setTeamMembers } = useUser();

  return (
    <Container className="p-3 justify-content-start ms-0 d-flex flex-column">
      <h5>Team Members</h5>
      <Container className="col-12 col-lg-6  ms-0 align-self-start">
        <MemberSelection
          itemSelected={teamMembers}
          formMode={false}
          setItemSelected={setTeamMembers}
        />
      </Container>
    </Container>
  );
}
