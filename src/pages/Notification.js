import React, { useMemo } from "react";
// import { Alert, Button } from "antd";
import { Container } from "react-bootstrap";
import { useUser } from "../hooks/useContext";
import { handleUpdateNotificationStatus } from "../services";
import moment from "moment";
import { useNavigate } from "react-router";
import { useCheckSignIn } from "../hooks/useCheckSignIn";
import styledComponents from "styled-components";
import Alert from "../components/Alert/Alert";

export default function Notification() {
  // useCheckSignIn();
  // const { notifications } = useUser();
  const notifications = [
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1657214814766,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Received",
      seen: false,
      type: "received",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1657214814766,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Complete",
      seen: false,
      type: "complete",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1657214814766,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Accepted",
      seen: false,
      type: "accepted",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1657214814766,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Accepted",
      seen: false,
      type: "declined",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1651321231321,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Received",
      seen: false,
      type: "received",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1651321231321,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Complete",
      seen: false,
      type: "complete",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
    {
      batonId: "d69d2bd4-73d5-44a2-a1a0-30f25c610ee1",
      date: 1651321231321,
      description: "You received a new Baton from Bilal",
      docId: "21kimbynhexPDlZhzSMm",
      message: "Baton Accepted",
      seen: false,
      type: "accepted",
      uid: "iQZYFCmeTdUR3B8LTajDHiuyge72",
    },
  ];
  console.log(notifications);
  const navigate = useNavigate();

  const sectionSortedNotifications = useMemo(() => {
    if (notifications.length == 0) return [];

    // let groupObj = {};
    // notifications.map((item) => {
    //   const date = item.date;
    //   if (groupObj[date]) {
    //     groupObj[date].push(item);
    //   } else {
    //     groupObj[date] = [item];
    //   }
    // });

    // let arrayForm = [];

    // arrayForm = Object.keys(groupObj).map((key) => {
    //   return {
    //     date: key,
    //     notifications: notifications[key],
    //   };
    // });
    // console.log(groupObj);
    // console.log(arrayForm);

    let groupObj = {};
    let arrayForm = [];

    for (const item of notifications) {
      const date = item.date;
      if (groupObj[date]) {
        groupObj[date].push(item);
      } else {
        groupObj[date] = [item];
      }
    }

    for (const key in groupObj) {
      arrayForm.push({
        date: key,
        notifications: groupObj[key],
      });
    }

    console.log(groupObj);
    console.log(arrayForm);

    return arrayForm;
  }, [notifications]);

  return (
    <Container className="p-3 justify-content-start ms-0 d-flex flex-column">
      <h5>Notifications</h5>
      <Container
        className="col-12 col-lg-6 justify-content-start ms-0 px-0"
        style={{ marginTop: "16px" }}
      >
        {notifications.length == 0 && (
          <h5 className="mt-5">You do not have any notifications</h5>
        )}

        {sectionSortedNotifications?.map((item, index) => (
          <div key={index} style={index > 0 ? { marginTop: "32px" } : {}}>
            <DateText>
              {moment(new Date(parseInt(item.date))).format("MMM DD, YYYY")}
            </DateText>

            {item.notifications?.map((notification, index) => (
              <Alert
                key={index}
                className="mt-2"
                batonTitle={notification.message}
                batonName={notification.message}
                batonDescription={notification.description}
                batonType={notification.type}
                onClose={() =>
                  handleUpdateNotificationStatus(notification.docId, true)
                }
                onViewDetails={() =>
                  navigate(`/batonsForm/${notification.batonId}`)
                }
              />
            ))}
          </div>
        ))}
      </Container>
    </Container>
  );
}
{
  /* <Alert
  key={index}
  className="mt-3"
  message={`${e.message} on ${moment(e.date).format(
    "MMM Do YYYY"
  )}`}
  description={e.description}
  showIcon
  action={
    <Button
      size="small"
      onClick={() => navigate(`/batonsForm/${e.batonId}`)}
    >
      View Details
    </Button>
  }
  closable
  afterClose={() => handleUpdateNotificationStatus(e.docId, true)}
/> */
}

const DateText = styledComponents.label`
  font-size: 16px;
  font-family: heebo;
`;
