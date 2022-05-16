import React from "react";
import { Collapse } from "antd";
import { Container } from "react-bootstrap";
import {
  CaretRightOutlined,
  RightOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import styledComponents from "styled-components";
import { colors } from "../../utilities/colors";
import { useNavigate } from "react-router";

const { Panel } = Collapse;

export default function Collapseable({
  title = "Dummy",
  count = 0,
  bgColor = "#F4F5F6",
  borderColor = "#5F6B72",
  textColor = colors.dashboardText,
  batonsData = [],
}) {
  const navigate = useNavigate();
  return (
    <CustomCollapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          style={{ fontSize: 24, marginTop: 5 }}
        />
      )}
      className="site-collapse-custom-collapse"
      bgcolor={bgColor}
      bordercolor={borderColor}

      // expandIconPosition="right"
    >
      <Panel
        header={
          <h4 style={{ color: textColor }}>
            {title} ({batonsData.length})
          </h4>
        }
        key="1"
        className="site-collapse-custom-panel"
        extra={
          <MenuOutlined
            color="black"
            onClick={(event) => {
              // If you don't want click extra trigger collapse, you can prevent this:
              event.stopPropagation();
            }}
            style={{ fontSize: 24, marginTop: 5 }}
          />
        }
      >
        {/* Panel Items */}
        {batonsData.map((e, index) => (
          <PanelItem
            key={e.id}
            className="row mx-2 align-items-center justify-content-between my-3"
            bordercolor={borderColor}
            onClick={() => navigate(`/dashboard/batonsForm/${e.id}`)}
          >
            <Container
              className="col-8  col-md-10 pt-2"
              style={{ wordWrap: "break-word" }}
            >
              <h5 style={{ color: textColor }}>{e.title}</h5>
            </Container>
            <Container className="col-4 col-md-2">
              <RightOutlined style={{ fontWeight: "bold", fontSize: 24 }} />
            </Container>
          </PanelItem>
        ))}

        {/* ------------------- */}
      </Panel>
    </CustomCollapse>
  );
}

const CustomCollapse = styledComponents(Collapse)`
    background-color: ${({ bgcolor }) => bgcolor};
    border-top: 3px solid ${({ bordercolor }) => bordercolor};
    position: relative;
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
