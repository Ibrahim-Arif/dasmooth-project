import React, { useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import {
  Modal,
  Input,
  Button,
  Dropdown,
  Menu,
  Avatar,
  Form,
  Typography,
} from "antd";
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
  FileUpload,
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
  handleGetBatonFilesSnapshot,
  handleUpdateBaton,
  handleGetBatonPostUpdates,
} from "../services";
import { generateNotification } from "../utilities/generateNotification";
import moment from "moment";
import { handleAddNotification } from "../services/handleAddNotification";

const { Title, Text, Link } = Typography;

export default function BatonsForm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDraftModalVisible, setIsDraftModalVisible] = useState(false);

  const [activeTitle, setActiveTitle] = useState("");

  // 0 means no item is selected
  // 1 means the first item is selected
  // 2 means the second item is selected
  // 3 means the third item is selected
  // 4 means the fourth item is selected
  // 5 means the fifth item is selected
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [teamMemberData, setTeamMemberData] = useState(null);
  const [dateData, setDateData] = useState(null);
  const [budgetData, setBudgetData] = useState(null);
  const [postUpdateData, setPostUpdateData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filesList, setFilesList] = useState(null);
  // {
  //   text: "Attach a file",
  //   filesList: [],
  // }
  const [id, setID] = useState();

  const [loading, setLoading] = useState(false);
  const [fetchedDataObject, setFetchedDataObject] = useState({
    status: "pending",
    deletedOn: 0,
  });
  const [isEditable, setIsEditable] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isNewPost, setIsNewPost] = useState(true);

  const { batonsData, isLogin } = useUser();

  const params = useParams();
  const navigate = useNavigate();

  // Conditions

  // if baton is not delete and there is an id in the url and the author of the baton is the same as the logged in user
  const doShowDropDownMenuOnPage =
    !isDeleted && params.id && fetchedDataObject.authorId == isLogin.uid;

  const isTitleInputFieldDisabled =
    fetchedDataObject.authorPostStatus != "pending" &&
    fetchedDataObject.authorPostStatus != undefined
      ? true
      : false;

  const isAddDescriptionInputFieldDisabled =
    fetchedDataObject.authorPostStatus != "pending" &&
    fetchedDataObject.authorPostStatus != undefined
      ? true
      : false;

  const isSelectableItemPressable = isEditable && !isDeleted;

  const flushData = () => {
    setActiveItemIndex(0);
    // setID(null);
    // setTitle("");
    setActiveTitle("");
    setTeamMemberData(null);
    setDateData(null);
    setBudgetData(null);
    setPostUpdateData(null);
    setFilesList(null);
  };

  const showModal = () => {
    setIsModalVisible(true);
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
        memberName: teamMemberData.name,
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
            batonType: "received",
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

  const handleResetPageView = () => {
    setIsModalVisible(false);
    resetFormView();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormItemRender = (index) => {
    setActiveItemIndex(index);
    if (window.innerWidth < 1024) {
      showModal();
    }
  };

  // This is to hide the form on fill
  const resetFormView = () => {
    // console.log("resetFormView calling");
    setActiveItemIndex(0);
    setActiveTitle("");
  };

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

  const editableFields = useMemo(() => {
    if (isNewPost) {
      return {
        title: true,
        description: true,
        teamMember: true,
        date: true,
        budget: true,
        postUpdate: true,
        files: true,
      };
    } else {
      console.log(fetchedDataObject);
      if (fetchedDataObject.authorId == isLogin.uid)
        switch (fetchedDataObject.authorPostStatus) {
          case "pending":
            return {
              title: true,
              description: true,
              teamMember: true,
              date: true,
              budget: true,
              postUpdate: true,
              files: true,
            };
          case "passed":
            return {
              title: false,
              description: false,
              teamMember: false,
              date: false,
              budget: false,
              postUpdate: true,
              files: true,
            };
        }
      else
        switch (fetchedDataObject.memberPostStatus) {
          case "received":
            return {
              title: false,
              description: false,
              teamMember: false,
              date: false,
              budget: false,
              postUpdate: true,
              files: true,
            };
        }
    }
  }, [id]);

  useEffect(() => {
    // console.log("params:", params);
    if (params.id) {
      handleGetBatonFilesSnapshot(params.id, setFilesList);
      handleGetBatonPostUpdates(params.id, setPostUpdateData);
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
        name: filter.memberName,
      });
      setID(params.id);
      // console.log("filter", filter);
      // batonsData.forEach((e) => console.log(e.title, "|", e.docId));
    } else {
      let tempId = v4();
      setID(tempId);
      setIsNewPost(true);
      if (!loading) {
        flushData();
        console.log("new post dta flushed");
      }
    }
  }, [params]);

  // ! this works but resets the page
  // window.onpopstate = () => {
  //   // window.history.pushState(null, null, window.location.href);
  //   window.history.go(1);
  //   const isAnyFieldNotEmpty =
  //     teamMemberData != null ||
  //     dateData != null ||
  //     budgetData != null ||
  //     postUpdateData != null ||
  //     filesList != null ||
  //     title != "" ||
  //     description != "";

  //   if (isAnyFieldNotEmpty && isNewPost) {
  //     setIsDraftModalVisible(true);
  //   } else {
  //     setIsDraftModalVisible(false);
  //     if (isDeleted) navigate("/deleteBaton");
  //     else navigate("/main");
  //   }
  // };

  return (
    <Container className="d-flex flex-row mt-4 mx-0 justify-content-start align-items-start justify-content-lg-start">
      {/* Save in Draft Modal */}
      <Modal
        title="Confirm"
        visible={isDraftModalVisible}
        onCancel={() => setIsDraftModalVisible(false)}
        footer={null}
        mask={false}
      >
        <Text strong>
          You have unsaved changes to your Baton. Do you want to save your
          changes?
        </Text>

        <div className="col-12">
          <TealButton htmlType="button" className="col-12">
            SAVE BATON
          </TealButton>

          <TealButton
            htmlType="button"
            className="col-12"
            mode="outlined"
            onClick={() => {
              setIsDraftModalVisible(false);
              navigate("/main");
            }}
          >
            DISCARD
          </TealButton>
        </div>
      </Modal>

      <Container fluid className="col">
        {/* Left Side Items List Container */}
        <Container className="col">
          {/* ArrowBack, DropDown menu div */}
          <div className="col d-flex flex-row justify-content-between ">
            <ArrowLeftOutlined
              style={{ fontSize: 20 }}
              onClick={() => {
                const isAnyFieldNotEmpty =
                  teamMemberData != null &&
                  dateData != null &&
                  budgetData != null &&
                  title != "" &&
                  description != "";

                if (isAnyFieldNotEmpty && isNewPost) {
                  setIsDraftModalVisible(true);
                } else {
                  setIsDraftModalVisible(false);
                  if (isDeleted) navigate("/deleteBaton");
                  else navigate("/main");
                }
              }}
            />

            {doShowDropDownMenuOnPage && (
              <Dropdown
                overlay={
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
                }
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

          {/* --------If Baton is deleted show this box------ */}
          {isDeleted && (
            <NotificationBox
              text={`You deleted this on ${moment(
                fetchedDataObject.deletedOn
              ).format("MMMM DD ,YYYY")}`}
            />
          )}

          <Input
            size="large"
            placeholder="Add Title"
            className={`me-3 ${!isDeleted && "mt-4"} input-placeholder`}
            onChange={(e) => setTitle(e.currentTarget.value)}
            style={{ border: "none", backgroundColor: "transparent" }}
            value={title}
            // required={true}
            // status={title == "" && "error"}
            disabled={isTitleInputFieldDisabled}
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
                disabled={isAddDescriptionInputFieldDisabled}
              />
            </Form.Item>
          </div>

          <Container fluid className="px-0">
            <Selectable
              icon={
                teamMemberData != null ? (
                  <Avatar style={{ backgroundColor: colors.tealLight20 }}>
                    {teamMemberData?.name?.substring(0, 2).toUpperCase()}
                  </Avatar>
                ) : (
                  <UserOutlined />
                )
              }
              text={
                teamMemberData ? teamMemberData?.name : "Select a team member"
              }
              isEditable={editableFields?.teamMember}
              onItemPress={() =>
                isSelectableItemPressable && handleFormItemRender(1)
              }
              isItemActive={activeItemIndex == 1 || teamMemberData}
            />

            <Selectable
              icon={<CalendarOutlined />}
              text={dateData ? dateData : "Set a deadline"}
              isEditable={editableFields?.date}
              isItemActive={activeItemIndex == 2 || dateData}
              onItemPress={() =>
                isSelectableItemPressable && handleFormItemRender(2)
              }
            />
            <Selectable
              icon={<DollarOutlined />}
              text={
                budgetData
                  ? `${budgetData != "N/A" ? "$" : ""}${budgetData}`
                  : "Set a budget"
              }
              isEditable={editableFields?.budget}
              isItemActive={activeItemIndex == 3 || budgetData}
              onItemPress={() =>
                isSelectableItemPressable && handleFormItemRender(3)
              }
            />
            <Selectable
              icon={<FileAddOutlined />}
              isEditable={editableFields?.files}
              text={
                filesList
                  ? filesList.length + " files attached"
                  : "Attach a file"
              }
              isItemActive={activeItemIndex == 4 || filesList || params.id}
              onItemPress={() => !isDeleted && handleFormItemRender(4)}
            />
            <Selectable
              icon={<FileTextOutlined />}
              isEditable={editableFields?.postUpdate}
              text="Post an Update"
              isItemActive={activeItemIndex == 5 || postUpdateData}
              onItemPress={() => !isDeleted && handleFormItemRender(5)}
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
                // disabled={disabled}
                disabled={
                  !(
                    dateData != null &&
                    budgetData != null &&
                    teamMemberData != null &&
                    title != "" &&
                    description != ""
                  )
                }
              >
                PASS
              </TealButton>
            )
          )}
        </Container>
      </Container>

      {/* Rigth Side Container */}
      <Container
        className="col flex-column d-none d-lg-flex"
        style={{ borderLeft: "1px solid grey" }}
      >
        {activeItemIndex == 1 && (
          <>
            <h4>Select a member</h4>
            <MemberSelection
              itemSelected={teamMemberData}
              setItemSelected={setTeamMemberData}
              clickOk={handleResetPageView}
              formMode={true}
            />
          </>
        )}

        {activeItemIndex == 2 && (
          <>
            <h4>Set a deadline</h4>
            <DateTimeSelection
              itemSelected={dateData}
              setItemSelected={setDateData}
              clickOk={handleResetPageView}
            />
          </>
        )}

        {activeItemIndex == 3 && (
          <>
            <h4>Set a budget</h4>
            <BudgetForm
              itemSelected={budgetData}
              setItemSelected={setBudgetData}
              clickOk={handleResetPageView}
            />
          </>
        )}

        {activeItemIndex == 4 && (
          <>
            <h4>Attach a file</h4>
            <FileUpload
              boxColor={colors.teal100}
              itemSelected={filesList}
              setItemSelected={setFilesList}
              // setFilesListB64={setFilesListB64}
              batonId={id}
              clickOk={() => {
                handleResetPageView();
              }}
            />
          </>
        )}

        {activeItemIndex == 5 && (
          <>
            <h4>Post an Update</h4>
            <PostUpdateForm
              itemSelected={postUpdateData}
              setItemSelected={setPostUpdateData}
              clickOk={handleResetPageView}
              batonId={id}
              username={isLogin.email}
            />
          </>
        )}
      </Container>

      {/* Web View Items Modal Modal */}
      <Modal
        title={activeTitle}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        mask={false}
      >
        {activeItemIndex == 1 && (
          <>
            <h4>Select a member</h4>
            <MemberSelection
              itemSelected={teamMemberData}
              setItemSelected={setTeamMemberData}
              clickOk={handleResetPageView}
              formMode={true}
            />
          </>
        )}

        {activeItemIndex == 2 && (
          <>
            <h4>Set a deadline</h4>
            <DateTimeSelection
              itemSelected={dateData}
              setItemSelected={setDateData}
              clickOk={handleResetPageView}
            />
          </>
        )}

        {activeItemIndex == 3 && (
          <>
            <h4>Set a budget</h4>
            <BudgetForm
              itemSelected={budgetData}
              setItemSelected={setBudgetData}
              clickOk={handleResetPageView}
            />
          </>
        )}

        {activeItemIndex == 4 && (
          <>
            <h4>Attach a file</h4>
            <FileUpload
              boxColor={colors.teal100}
              itemSelected={filesList}
              setItemSelected={setFilesList}
              // setFilesListB64={setFilesListB64}
              batonId={id}
              clickOk={() => {
                handleResetPageView();
                resetFormView();
              }}
            />
          </>
        )}

        {activeItemIndex == 5 && (
          <>
            <h4>Post an Update</h4>
            <PostUpdateForm
              itemSelected={postUpdateData}
              setItemSelected={setPostUpdateData}
              clickOk={handleResetPageView}
              batonId={id}
              username={isLogin.email}
            />
          </>
        )}
      </Modal>
    </Container>
  );
}
