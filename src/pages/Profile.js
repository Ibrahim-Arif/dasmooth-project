import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ImagePicker, Loading, TealButton } from "../components";
import { useCheckSignIn } from "../hooks/useCheckSignIn";
import { useUser } from "../hooks/useContext";
import { handleUserInformationUpdate } from "../services";
import { generateNotification } from "../utilities/generateNotification";

export default function Profile() {
  // useCheckSignIn();
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLogin } = useUser();

  useEffect(() => {
    setEmail(isLogin.email);
    setName(isLogin.displayName);
    setProfileImage(isLogin.photoURL);
  }, []);

  const handleSave = () => {
    setLoading(true);
    handleUserInformationUpdate(email, name, profileImage)
      .then(() => {
        generateNotification("success", "Profile updated successfully");
      })
      .catch(() => {
        generateNotification("error", "Profile update failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="p-3 justify-content-start ms-0 d-flex flex-column">
      <h5>Profile</h5>
      <Container className="d-flex flex-column justify-content-center">
        <ImagePicker
          setItems={setProfileImage}
          items={profileImage}
          item={profileImage}
          className="align-self-center"
        />
        <Form.Item>
          <label>Name:</label>
          <Input
            className="normal-input"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
        </Form.Item>
        <Form.Item>
          <label>Email:</label>
          <Input
            className="normal-input"
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
          />
        </Form.Item>
        {loading ? (
          <Loading />
        ) : (
          <TealButton onClick={handleSave}>Save</TealButton>
        )}
      </Container>
    </Container>
  );
}
