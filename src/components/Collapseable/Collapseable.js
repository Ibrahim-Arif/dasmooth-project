import React, { useEffect } from "react";
import { Collapse } from "antd";
import { Container } from "react-bootstrap";
import {
  CaretRightOutlined,
  RightOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import styledComponents from "styled-components";
import { colors } from "../../utilities/colors";
import { useLocation, useNavigate } from "react-router";

const { Panel } = Collapse;

export default function Collapseable({
  title = "Dummy",
  count = 0,
  bgColor = "#F4F5F6",
  borderColor = "#5F6B72",
  textColor = colors.dashboardText,
  batonsData = [],
  className = "",
}) {
  // useEffect(() => console.log("Collapseable", batonsData), [batonsData]);

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <CustomCollapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          style={{ fontSize: 24, marginTop: 0 }}
          className="caret-icon"
        />
      )}
      className={`site-collapse-custom-collapse ${className}`}
      bgcolor={bgColor}
      bordercolor={borderColor}

      // expandIconPosition="right"
    >
      <Panel
        header={
          <div className="baton-title-div">
            <h4 style={{ color: textColor, marginBottom: 0 }}>
              {title} ({batonsData.length})
            </h4>
          </div>
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
            className="bars-icon"
            style={{ fontSize: 24, marginTop: 0 }}
          />
        }
      >
        {/* Panel Items */}
        {batonsData.map((e, index) => (
          <PanelItem
            key={index}
            className="row mx-0 align-items-center justify-content-between mb-3"
            bordercolor={borderColor}
            onClick={() => {
              // console.log(e)
              // console.log(`/batonsForm/${e.docId}`);
              navigate(`/batonsForm/${e.docId}`, { state: { from: location } });
            }}
          >
            <Container
              className="col-8  col-md-11 pt-2"
              style={{ wordWrap: "break-word" }}
            >
              <h5 style={{ color: textColor }}>{e.title}</h5>
            </Container>
            <Container className="col-4 col-md-1 d-flex justify-content-end px-0 pe-2">
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
    user-select: none;
`;
const PanelItem = styledComponents.div`
    border-left: 5px solid ${({ bordercolor }) => bordercolor};
    border-color: ${({ bordercolor }) => bordercolor};
    background-color: white;
    // border-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    outline-color: ${({ bordercolor }) => bordercolor};

    min-height: 50px;
    font-weight: bold;
    transition: 0.4s;
    box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.25);
    -webkit-box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.25);
    :hover{
        cursor: pointer;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.25);
        -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.25);
        outline: 1px solid ${({ bordercolor }) => bordercolor};
        outline-offset: -1.5px;
        border-color: ${({ bordercolor }) => bordercolor};
        border-left: 5px solid ${({ bordercolor }) => bordercolor};
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
