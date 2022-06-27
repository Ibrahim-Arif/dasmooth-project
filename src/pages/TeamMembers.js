import { EllipsisOutlined, DeleteFilled } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import { useUser } from "../hooks/useContext";
import { Avatar, List } from "antd";
import { colors } from "../utilities/colors";
import { MemberSelection } from "../components";

export default function TeamMembers() {
  const { teamMembers, setTeamMembers } = useUser();

  return (
    <Container className="p-3 justify-content-start d-flex flex-column">
      <h5>Team Members</h5>
      <Container className="col-6 justify-content-start ms-0">
        <MemberSelection
          itemSelected={teamMembers}
          formMode={false}
          setItemSelected={setTeamMembers}
        />
        {/* <List
            itemLayout="horizontal"
            dataSource={teamMembers}
            renderItem={item => (
                <Dropdown
                  overlay={menu}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                 
                >
              <List.Item style={{backgroundColor:colors.cgLight80,borderRadius:15,padding:10,marginTop:15}}>
                <List.Item.Meta       
                  avatar={<Avatar style={{backgroundColor:colors.teal100}}>{item.name.substring(0,2).toUpperCase()}</Avatar>}
                  title={<label>{`${item.name} (${item.status})`}</label>}
                  description={item.receiverEmail}
                  />
                 <EllipsisOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => {
                    // navigate("/main");
                  }}
                  rotate={90}
                />
              </List.Item>
          </Dropdown>
            )}
          />
        */}
      </Container>
    </Container>
  );
}
