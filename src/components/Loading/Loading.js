import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

export default function Loading({ size, color }) {
  const antIcon = <LoadingOutlined spin style={{ color: color }} />;
  return <Spin size={size} indicator={antIcon} />;
}
