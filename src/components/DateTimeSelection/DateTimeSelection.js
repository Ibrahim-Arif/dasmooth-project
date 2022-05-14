import React, { useState } from "react";
import { Calendar, Alert } from "antd";
import moment from "moment";
import { Container } from "react-bootstrap";
import { colors } from "../../utilities/colors";

export default function DateTimeSelection() {
  const [dateTime, setDataTime] = useState("");
  const [calendar, setCalendar] = useState({
    value: moment(),
    selectedValue: moment(),
  });

  const onSelect = (value) => {
    setCalendar({
      value,
      selectedValue: value,
    });
  };

  const onPanelChange = (value) => {
    setCalendar({
      ...calendar,
      value,
    });
  };

  return (
    <Container>
      <div
        className="d-flex align-items-center justify-content-center py-2"
        style={{ backgroundColor: colors.teal100, color: "white" }}
      >
        <h6 style={{ color: "white" }}>
          {calendar.selectedValue &&
            calendar.selectedValue.format("dddd, MMMM Do, YYYY")}
        </h6>
      </div>
      <Calendar
        fullscreen={false}
        headerRender={null}
        value={calendar.value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <div></div>
    </Container>
  );
}
