import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Modal, Input } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileAddOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import { colors } from "../utilities/colors";
import {
  BudgetForm,
  DashboardView,
  DateTimeSelection,
  Selectable,
  ImageUpload,
  MemberSelection,
  PostUpdateForm,
  TealButton,
} from "../components";

import { useUser } from "../hooks/useContext";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";

import "./dashboard.css";
export default function Dashboard() {
  return (
    <>
      <Container className="d-flex flex-row mt-4 mx-0 justify-content-start align-items-start justify-content-lg-start">
        <Container className="col">
          <DashboardView />
        </Container>
        <Container className="col flex-column d-none d-lg-flex"></Container>
      </Container>
    </>
  );
}
