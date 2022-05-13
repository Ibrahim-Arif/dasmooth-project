import {
  PieChartOutlined,
  TeamOutlined,
  LoginOutlined,
  DeleteOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

export const menuItems = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("Notifications", "notifications", <BellOutlined />),
  getItem("Profile Settings", "profile", <SettingOutlined />),
  getItem("Team Members", "team", <TeamOutlined />),
  getItem("Deleted Batons", "delete", <DeleteOutlined />),
  getItem(
    "Logout",
    "logout",

    <LoginOutlined />
  ),
];
