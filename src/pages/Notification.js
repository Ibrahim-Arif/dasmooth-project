import React from "react";
import { Alert, Button } from "antd";
import { Container } from "react-bootstrap";
import { useUser } from "../hooks/useContext";
import { handleUpdateNotificationStatus } from "../services";
import moment from "moment";
import { useNavigate } from "react-router";

export default function Notification() {
  const { notifications } = useUser();
  const navigate = useNavigate();

  return (
    <Container className="p-3 justify-content-start d-flex flex-column">
      <h5>Notifications</h5>
      <Container className="col-6 justify-content-start ms-0">
        {notifications.length == 0 && (
          <h5 className="mt-5">You do not have any notifications</h5>
        )}
        {notifications.map((e, index) => (
          <Alert
            className="mt-3"
            message={`${e.message} on ${moment(e.date).format("MMM Do YYYY")}`}
            description={e.description}
            type={e.type}
            showIcon
            action={
              <Button
                size="small"
                info
                onClick={() => navigate(`/batonsForm/${e.batonId}`)}
              >
                Detail
              </Button>
            }
            closable
            afterClose={() => handleUpdateNotificationStatus(e.docId, true)}
          />
        ))}
      </Container>
    </Container>
  );
}
