import React, { useState } from "react";
import { Calendar, TimePicker } from "antd";
import { Container } from "react-bootstrap";
import moment from "moment";

import { colors } from "../../utilities/colors";
import { TealButton } from "../FormButton/FormButton";

export default function DateTimeSelection({
  itemSelected,
  setItemSelected,
  clickOk,
}) {
  const [calendar, setCalendar] = useState({
    value: moment(),
    selectedValue: moment(),
  });
  const [time, setTime] = useState("");
  function onChange(time, timeString) {
    setTime(timeString);
  }
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
      <div className="col-12 mt-3">
        <TimePicker
          status={time == "" && "error"}
          use12Hours
          format="h:mm a"
          onChange={onChange}
          size="large"
          className="col-12"
          inputReadOnly
        />
      </div>

      <TealButton
        onClick={() => {
          if (time == "") return;
          else
            setItemSelected(
              `${calendar.selectedValue.format(
                "dddd, MMMM Do, YYYY"
              )} at ${time}`
            );
          clickOk();
        }}
        className="col-12"
      >
        SET DEADLINE
      </TealButton>
    </Container>
  );
}
