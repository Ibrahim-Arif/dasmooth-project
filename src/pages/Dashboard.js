import React from "react";
import { Container } from "react-bootstrap";
import { DashboardView } from "../components";

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
