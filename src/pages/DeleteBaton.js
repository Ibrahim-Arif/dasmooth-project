import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Collapseable } from "../components";
import { useUser } from "../hooks/useContext";
import { filterBatonsData } from "../utilities/filterBatonsData";

export default function DeleteBaton() {
  const { batonsData, isLogin } = useUser();
  const [deletedBatons, setDeletedBatons] = useState([]);

  useEffect(() => {
    let deleted = filterBatonsData(batonsData, "deleted", isLogin.uid);
    setDeletedBatons(deleted);
  }, [batonsData]);

  return (
    <Container className="col-12 mt-5">
      {/* <Container className="col-10 mt-5"> */}
      <Collapseable
        title={`Deleted Batons`}
        batonsData={deletedBatons}
        bgColor={"white"}
        borderColor={"red"}
        className="col-12"
      />
      {/* </Container> */}
    </Container>
  );
}
