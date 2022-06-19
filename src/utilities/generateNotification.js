import { notification } from "antd";

export const generateNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    placement: "topRight",
  });
  setTimeout(() => notification.close(), 1000);
};
