import React, { useEffect, useState } from "react";
import { Input, Avatar } from "antd";
import { Container } from "react-bootstrap";
import { TealButton } from "../FormButton/FormButton";
import { handleAddPostUpdate, handleGetBatonPostUpdates } from "../../services";
import { generateNotification } from "../../utilities/generateNotification";
import styled from "styled-components";
import moment from "moment";
import { colors } from "../../utilities/colors";
import { useUser } from "../../hooks/useContext";

export default function PostUpdateForm({
  // itemSelected,
  // setItemSelected,
  batonId,
  username,
  clickOk,
}) {
  const [value, setValue] = useState("");
  const [postData, setPostData] = useState([]);
  const { isLogin } = useUser();

  const onChange = (e) => {
    console.log("changed", e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    if (batonId != null) handleGetBatonPostUpdates(batonId, setPostData);
  }, []);

  return (
    <Container className="mt-3">
      <Input
        onChange={onChange}
        style={{ borderRadius: 5, width: "100%" }}
        size="large"
        value={value}
      />
      <TealButton
        className="col-12"
        onClick={() => {
          if (batonId != null) {
            if (value == "") return;
            let data = {
              batonId,
              text: value,
              timestamp: Date.now(),
              username,
            };
            handleAddPostUpdate(data)
              .then(() => {
                generateNotification(
                  "success",
                  "Post Update Successfully",
                  "Post Update Successfully"
                );
                clickOk();
                setValue("");
              })
              .catch((ex) =>
                generateNotification("error", ex.message, ex.message)
              );
          } else {
            generateNotification(
              "warning",
              "Post Update",
              "You need add add a baton first"
            );
          }
        }}
      >
        POST UPDATE
      </TealButton>
      <div className="mt-3">
        {postData.map((e) => (
          <UpdatesContainer className="d-flex flex-row">
            <div className="d-flex flex-column pt-2">
              {isLogin.photoURL != "" ? (
                <Avatar src={isLogin.photoURL} />
              ) : (
                <Avatar style={{ backgroundColor: colors.teal100 }}>
                  {e.username.substring(0, 2).toUpperCase()}
                </Avatar>
              )}
            </div>
            <div className="d-flex flex-column justify-content-center ms-3">
              <label style={{ fontSize: 13 }}>{e.username}</label>
              <label style={{ fontSize: 13 }}>
                {moment(e.timestamp).format("MMMM DD, YYYY - hh:mm:ss A ")}
              </label>
              <label style={{ fontWeight: "600" }}>{e.text}</label>
            </div>
          </UpdatesContainer>
        ))}
      </div>
    </Container>
  );
}

const UpdatesContainer = styled(Container)`
  border-top: 0.5px solid #e8e8e8;
  // border-bottom: 0.5px solid #e0e0e0;
`;
