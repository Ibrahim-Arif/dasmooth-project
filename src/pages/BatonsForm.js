import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Modal, Input, Button, Dropdown, Menu, Avatar, Form } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileAddOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  EllipsisOutlined,
  DeleteFilled,
  CopyOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4, v4 } from "uuid";

import { colors } from "../utilities/colors";
import {
  BudgetForm,
  DateTimeSelection,
  Selectable,
  ImageUpload,
  MemberSelection,
  PostUpdateForm,
  TealButton,
  Loading,
  NotificationBox,
} from "../components";

import { useUser } from "../hooks/useContext";
import { useNavigate, useParams } from "react-router";
import {
  handleAddBaton,
  handleDeleteBaton,
  handleGetBatonFiles,
  handleUpdateBaton,
} from "../services";
import { generateNotification } from "../utilities/generateNotification";
import moment from "moment";
import { handleAddNotification } from "../services/handleAddNotification";
import { useCheckSignIn } from "../hooks/useCheckSignIn";

export default function BatonsForm() {
  // useCheckSignIn();
  const { batonsData, setBatonsData, teamMembers, isLogin } = useUser();
  const params = useParams();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [activeTitle, setActiveTitle] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [teamMemberData, setTeamMemberData] = useState({
    text: "Select a team member",
    icon: <UserOutlined />,
    image: null,
  });
  const [dateData, setDateData] = useState("Set a deadline");
  const [budgetData, setBudgetData] = useState("Set a budget");
  const [postUpdateData, setPostUpdateData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filesList, setFilesList] = useState({
    text: "Attach a file",
    filesList: [],
  });

  const [id, setID] = useState();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetchedDataObject, setFetchedDataObject] = useState({
    status: "pending",
    deletedOn: 0,
  });

  const [isEditable, setIsEditable] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isNewPost, setIsNewPost] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const flushData = () => {
    setActiveComponent(null);
    setActiveItemIndex(-1);
    // setID(null);
    // setTitle("");
    setActiveTitle("");
    setTeamMemberData({
      text: "Select a team member",
      icon: <UserOutlined />,
      image: null,
    });
    setDateData("Set a deadline");
    setBudgetData("Set a budget");
    setPostUpdateData("");
    setFilesList({
      text: "Attach a file",
      filesList: [],
    });
    // setFilesListB64([]);
  };

  const handlePass = () => {
    // console.log(
    //   dateData,
    //   budgetData,
    //   postUpdateData,
    //   filesList.filesList,
    //   title
    // );

    if (isNewPost) {
      // console.log("New");

      let post = {
        deadline: dateData,
        budget: budgetData,
        title,
        authorId: isLogin.uid,
        memberId: teamMemberData.id,
        authorName:
          isLogin.displayName != null ? isLogin.displayName : isLogin.email,
        memberName: teamMemberData.text,
        authorPostStatus:
          teamMemberData.status == "accepted" ? "passed" : "pending",
        memberPostStatus: "received",
        createdOn: Date.now(),
        deletedOn: 0,
        description: description,
      };
      // console.log("new Post");
      // console.log(post);
      // return;
      setLoading(true);
      // console.log("Adding new post");
      handleAddBaton(post, id)
        .then((docId) => {
          handleAddNotification({
            seen: false,
            message: "Baton Received",
            description: `You received a new Baton from ${post.authorName}`,
            type: "success",
            uid: post.memberId,
            date: Date.now(),
            batonId: docId,
          });
          generateNotification(
            "success",
            "Baton Added",
            "You baton is created"
          );
          setLoading(false);
          navigate("/main");
        })
        .catch((ex) => {
          generateNotification("error", "Error", "Failed to create you baton");
          // console.log(ex);
          setLoading(false);
        });
    } else {
      // console.log("Edit");
      let editedPost = {
        ...fetchedDataObject,
        deadline: dateData,
        budget: budgetData,
        title: title,
        description: description,
        memberName: teamMemberData.text,
        updateOn: Date.now(),
      };

      // console.log(editedPost);
      // return;
      setLoading(true);
      handleUpdateBaton(id, editedPost)
        .then(() => {
          setLoading(false);
          navigate("/main");
          generateNotification("success", "Baton Update", "Baton is updated");
        })
        .catch((ex) => {
          setLoading(false);
          generateNotification("error", "Error", "Failed to update baton");
          // console.log(ex);
        });
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormItemRender = (title, component, index) => {
    setActiveComponent(component);
    setActiveItemIndex(index);
    setActiveTitle(title);
    if (window.innerWidth < 1024) {
      showModal();
    }
  };

  // This is to hide the form on fill
  const resetFormView = () => {
    setActiveTitle("");
    setActiveComponent(null);
  };
  useEffect(() => {
    resetFormView();
    if (
      dateData != "Set a deadline" &&
      budgetData != "Set a budget" &&
      teamMemberData != "Select a team member" &&
      title != "" &&
      description != ""
    )
      setDisabled(false);
    else setDisabled(true);
  }, [dateData, budgetData, postUpdateData, title, teamMemberData]);
  // useEffect to update filesList if uploadfiles changes
  useEffect(
    () =>
      setFilesList({
        ...filesList,
        text: `${uploadedFiles.length} files attached`,
      }),
    [uploadedFiles]
  );

  useEffect(() => {
    // console.log("params:", params);
    if (params.id) {
      handleGetBatonFiles(params.id, setUploadedFiles);
      setIsNewPost(false);
      if (batonsData.length == 0) return;

      let filter = batonsData.filter((e) => e.docId == params.id);
      filter = filter[0];
      // console.log(filter);

      if (filter == undefined) return;

      if (
        filter.authorPostStatus == "passed" ||
        (filter.memberPostStatus == "received" &&
          filter.memberId == isLogin.uid)
      )
        setIsEditable(false);
      if (
        filter.authorPostStatus == "deleted" ||
        filter.authorPostStatus == "received"
      )
        setIsDeleted(true);
      // "editable:", isEditable;
      setFetchedDataObject(filter);
      setTitle(filter.title);
      setDescription(filter.description);

      setBudgetData(filter.budget);
      setDateData(filter.deadline);
      setPostUpdateData(filter.post);
      setTeamMemberData({
        text: filter.memberName,
        icon: (
          <Avatar style={{ backgroundColor: colors.tealLight20 }}>
            {filter.memberName.substring(0, 2).toUpperCase()}
          </Avatar>
        ),
        // image: ,
      });
      setID(params.id);
      // console.log("filter", filter);
      // batonsData.forEach((e) => console.log(e.title, "|", e.docId));
    } else {
      let tempId = v4();
      setID(tempId);
      setIsNewPost(true);
      flushData();
    }
  }, [params]);

  const handleDeleteClick = () => {
    let ret = window.confirm("Are you sure you want to delete this baton?");
    if (!ret) return;
    setLoading(true);
    handleDeleteBaton(fetchedDataObject.docId)
      .then(() => {
        setLoading(false);
        generateNotification(
          "success",
          "Baton Deleted!",
          "Your baton is deleted!"
        );
        navigate("/main");
      })
      .catch((ex) => {
        setLoading(false);
        generateNotification("error", "Error", "Failed to delete your baton");
        // console.log(ex);
      });
  };

  const handleDuplicateClick = () => {
    let ret = window.confirm("Are you sure you want to duplicate this baton?");
    if (!ret) return;

    setLoading(true);
    let temp = fetchedDataObject;
    temp.title = `${temp.title} (Duplicate)`;
    handleAddBaton(temp, v4())
      .then(() => {
        generateNotification(
          "success",
          "Baton Added",
          "You baton is duplicated"
        );
        setLoading(false);
        navigate("/main");
      })
      .catch((ex) => {
        generateNotification("error", "Error", "Failed to create you baton");
        setLoading(false);
      });
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              className="d-flex flex-row align-items-center"
              onClick={handleDeleteClick}
            >
              <DeleteFilled />
              Delete
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              className="d-flex flex-row align-items-center"
              onClick={handleDuplicateClick}
            >
              <CopyOutlined />
              Duplicate
            </div>
          ),
        },
      ]}
    />
  );
  return (
    <Container className="d-flex flex-row mt-4 mx-0 justify-content-start align-items-start justify-content-lg-start">
      {/* Invite by email modal */}
      <Modal
        title={activeTitle}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        mask={false}
      >
        {activeComponent}
      </Modal>

      <Container fluid className="col">
        <Container className="col">
          {/* ArrowBack, DropDown menu div */}
          <div className="d-flex flex-row justify-content-between">
            <ArrowLeftOutlined
              style={{ fontSize: 20 }}
              onClick={() => {
                if (isDeleted) navigate("/deleteBaton");
                else navigate("/main");
              }}
            />

            {!isDeleted &&
              params.id &&
              fetchedDataObject.authorId == isLogin.uid && (
                <Dropdown
                  overlay={menu}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                >
                  <EllipsisOutlined
                    style={{ fontSize: 20 }}
                    onClick={() => {
                      // navigate("/main");
                    }}
                    rotate={90}
                  />
                </Dropdown>
              )}
          </div>
          {/* -------------- */}
          {isDeleted && (
            <NotificationBox
              text={`You deleted this on ${moment(
                fetchedDataObject.deletedOn
              ).format("MMMM DD ,YYYY")}`}
            />
          )}
          {/* <h4 className="mt-4">{title == "" ? "Add Title" : title}</h4> */}
          <Input
            size="large"
            placeholder="Add Title"
            className={`me-3 ${!isDeleted && "mt-4"} input-placeholder`}
            onChange={(e) => setTitle(e.currentTarget.value)}
            style={{ border: "none", backgroundColor: "transparent" }}
            value={title}
            // required={true}
            // status={title == "" && "error"}
            disabled={
              fetchedDataObject.authorPostStatus != "pending" &&
              fetchedDataObject.authorPostStatus != undefined
                ? true
                : false
            }
            // prefix="Please input baton title!"
          />

          {/* FormItems */}
          <div className="col-12">
            <Form.Item
              // validateStatus={title == "" && "error"}
              // help={title != "" ? null : "This field is required"}
              className="mt-3"
            >
              {/* {console.log(fetchedDataObject.authorPostStatus)} */}
              <Input
                size="large"
                placeholder="Add Description"
                className="me-3 input-placeholder"
                onChange={(e) => setDescription(e.currentTarget.value)}
                value={description}
                // status={title == "" && "error"}
                disabled={
                  fetchedDataObject.authorPostStatus != "pending" &&
                  fetchedDataObject.authorPostStatus != undefined
                    ? true
                    : false
                }
                // prefix="Please input baton title!"
              />
            </Form.Item>
            {/* // <label>error</label> */}
          </div>
          <Container>
            <Selectable
              icon={teamMemberData.icon}
              image={teamMemberData.image}
              text={teamMemberData.text}
              onItemPress={() =>
                isEditable &&
                !isDeleted &&
                handleFormItemRender(
                  "Select a member",
                  <MemberSelection
                    itemSelected={teamMemberData}
                    setItemSelected={setTeamMemberData}
                    clickOk={handleOk}
                    formMode={true}
                  />,
                  1
                )
              }
              isItemActive={
                activeItemIndex == 1 ||
                teamMemberData.text != "Select a team member"
                  ? true
                  : false
              }
            />
            <Selectable
              icon={<CalendarOutlined />}
              text={dateData}
              isItemActive={
                activeItemIndex == 2 || dateData != "Set a deadline"
                  ? true
                  : false
              }
              onItemPress={() =>
                isEditable &&
                !isDeleted &&
                handleFormItemRender(
                  "Set a deadline",
                  <DateTimeSelection
                    itemSelected={dateData}
                    setItemSelected={setDateData}
                    clickOk={handleOk}
                  />,
                  2
                )
              }
            />
            <Selectable
              icon={<DollarOutlined />}
              text={budgetData}
              isItemActive={
                activeItemIndex == 3 || budgetData != "Set a budget"
                  ? true
                  : false
              }
              onItemPress={() =>
                isEditable &&
                !isDeleted &&
                handleFormItemRender(
                  "Set a budget",
                  <BudgetForm
                    itemSelected={budgetData}
                    setItemSelected={setBudgetData}
                    clickOk={handleOk}
                  />,
                  3
                )
              }
            />
            <Selectable
              icon={<FileAddOutlined />}
              text={filesList.text}
              isItemActive={
                activeItemIndex == 4 || filesList.text != "Attach a file"
                  ? true
                  : false
              }
              onItemPress={() =>
                !isDeleted &&
                handleFormItemRender(
                  "Attach a file",
                  <ImageUpload
                    boxColor={colors.teal100}
                    itemSelected={filesList}
                    setItemSelected={setFilesList}
                    // setFilesListB64={setFilesListB64}
                    batonId={id}
                    clickOk={() => {
                      handleOk();
                      resetFormView();
                    }}
                  />,
                  4
                )
              }
            />
            <Selectable
              icon={<FileTextOutlined />}
              text="Post an Update"
              isItemActive={
                activeItemIndex == 5 || postUpdateData != "" ? true : false
              }
              onItemPress={() =>
                !isDeleted &&
                handleFormItemRender(
                  "Post an Update",
                  <PostUpdateForm
                    itemSelected={postUpdateData}
                    setItemSelected={setPostUpdateData}
                    clickOk={handleOk}
                    batonId={id}
                    username={isLogin.email}
                  />,
                  5
                )
              }
            />
          </Container>
          {loading ? (
            <div className="d-flex mt-3 justify-content-center">
              <Loading size="large" color={colors.teal100} />
            </div>
          ) : (
            isEditable &&
            !isDeleted && (
              <TealButton
                className="col-12"
                onClick={handlePass}
                disabled={disabled}
              >
                PASS
              </TealButton>
            )
          )}
        </Container>
      </Container>

      {/*  */}
      <Container
        className="col flex-column d-none d-lg-flex"
        style={{ borderLeft: "1px solid grey" }}
      >
        <>
          <h4>{activeTitle}</h4>
          {activeComponent}
        </>
      </Container>
    </Container>
  );
}
