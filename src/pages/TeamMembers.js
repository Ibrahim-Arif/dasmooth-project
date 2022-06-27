import { EllipsisOutlined,DeleteFilled } from "@ant-design/icons";
import { Dropdown,Menu } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import { useUser } from "../hooks/useContext";
import { Avatar, List } from 'antd';
import { colors } from "../utilities/colors";

export default function TeamMembers() {
  const {teamMembers} = useUser()
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              className="d-flex flex-row align-items-center"
              style={{width:100}}
              // onClick={handleDeleteClick}
            >
              <DeleteFilled />
              Delete
            </div>
          ),
        },
      
      ]}
    />
  );
  return <Container className="p-3 justify-content-start d-flex flex-column">
    <h5>Team Members</h5>
    <Container className="col-6 justify-content-start ms-0">
      <List
            itemLayout="horizontal"
            dataSource={Object.values(teamMembers)}
            renderItem={item => (
                <Dropdown
                  overlay={menu}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                 
                >
              <List.Item style={{backgroundColor:colors.cgLight80,borderRadius:15,padding:10,marginTop:15}}>
                <List.Item.Meta       
                  avatar={<Avatar style={{backgroundColor:colors.teal100}}>{item.email.substring(0,2).toUpperCase()}</Avatar>}
                  title={<label>{item.email}</label>}
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
       
          
        
        </Container>
  </Container>;
}
