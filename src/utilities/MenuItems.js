import {
  PieChartOutlined,
  TeamOutlined,
  LoginOutlined,
  DeleteOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Badge, Menu } from "antd";

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

export const menuItems = () => [
  getItem(
    "Dashboard",
    "dashboard",
    <PieChartOutlined style={{ fontSize: "18px" }} />
  ),
  getItem(
    "Notifications",
    "notifications",
    // <Badge count={notificationCount}>
    <BellOutlined style={{ fontSize: "18px" }} />
    // </Badge>
  ),
  getItem(
    "Profile Settings",
    "profile",
    <SettingOutlined style={{ fontSize: "18px" }} />
  ),
  getItem(
    "Team Members",
    "team",
    <TeamOutlined style={{ fontSize: "18px" }} />
  ),
  getItem(
    "Deleted Batons",
    "delete",
    <DeleteOutlined style={{ fontSize: "18px" }} />
  ),
  getItem(
    "Logout",
    "logout",

    <LoginOutlined size={18} />
  ),
];
