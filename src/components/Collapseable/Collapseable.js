import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined, RightOutlined } from "@ant-design/icons";
import styledComponents from "styled-components";
import { Container } from "react-bootstrap";

const { Panel } = Collapse;

export default function Collapseable({
  title = "Dummy",
  count = 0,
  bgColor = "#e6e6e6",
  borderColor = "tomato",
}) {
  return (
    <CustomCollapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} size="large" />
      )}
      className="site-collapse-custom-collapse"
      bgcolor={bgColor}
      bordercolor={borderColor}
    >
      <Panel
        header={
          <h4>
            {title} ({count})
          </h4>
        }
        key="1"
        className="site-collapse-custom-panel"
      >
        {/* Panel Items */}
        <PanelItem
          className="row mx-2 align-items-center justify-content-between"
          bordercolor={borderColor}
        >
          <Container
            className="col-8  col-md-10 pt-2"
            style={{ wordWrap: "break-word" }}
          >
            <h5>{title}</h5>
          </Container>
          <Container className="col-4 col-md-2">
            <RightOutlined style={{ fontWeight: "bold", fontSize: 24 }} />
          </Container>
        </PanelItem>

        {/* ------------------- */}
      </Panel>
    </CustomCollapse>
  );
}

const CustomCollapse = styledComponents(Collapse)`
    background-color: ${({ bgcolor }) => bgcolor};
    border-top: 5px solid ${({ bordercolor }) => bordercolor};
`;
const PanelItem = styledComponents.div`
    border-left: 5px solid ${({ bordercolor }) => bordercolor};
    background-color: white;
    border-radius: 5px;
    min-height: 50px;
    font-weight: bold;
    transition: 0.4s;
    box-shadow: 0px 4px 0px 0px rgba(122,122,122,0.86);
    -webkit-box-shadow: 0px 4px 0px 0px rgba(122,122,122,0.86);
    -moz-box-shadow: 0px 4px 0px 0px rgba(122,122,122,0.86);
    :hover{
        cursor: pointer;
    }
    :active{
        box-shadow: none;
    }
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`;
