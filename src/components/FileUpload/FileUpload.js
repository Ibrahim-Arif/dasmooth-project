import React, { useEffect, useState } from "react";
import { Upload, List } from "antd";
import {
  DownloadOutlined,
  FileOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import Loading from "../Loading/Loading";
import { handleAddBatonFiles, handleUploadFile } from "../../services";
import { generateNotification } from "../../utilities/generateNotification";
import { colors } from "../../utilities/colors";
import styled from "styled-components";

const { Dragger } = Upload;

export default function FileUpload({
  boxColor,
  itemSelected,
  setItemSelected,
  batonId,
  clickOk,
}) {
  const [uploadableFiles, setUploadableFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const props = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      setUploadableFiles((fileData) => [...fileData, file]);
      return false;
    },
    onRemove: (file) => {
      setUploadableFiles((fileData) => {
        const index = fileData.indexOf(file);
        const newFileList = fileData.slice();
        newFileList.splice(index, 1);
        return [...newFileList];
      });
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleUpload = () => {
    if (uploadableFiles?.length == 0) return;
    if (batonId == null) {
      generateNotification("error", "Error", "Baton Id is null");
      return;
    }
    setUploading(true);

    for (let i = 0; i < uploadableFiles.length; i++) {
      // var reader = new FileReader();

      // reader.onloadend = function () {
      // b64.push(reader.result)
      // let file = reader.result;

      // if (reader.result.includes("data:file/png;base64,"))
      //   file = reader.result.replace("data:file/png;base64,", "");
      // else file = reader.result;

      let file = uploadableFiles[i];
      handleUploadFile(file, uploadableFiles[i].name, batonId)
        .then((imageFileUploadResponse) => {
          let filesData = {
            file: imageFileUploadResponse,
            batonId: batonId,
            fileName: uploadableFiles[i].name,
          };

          console.log(filesData);
          // return;
          handleAddBatonFiles(filesData)
            .then(() => {
              generateNotification("success", "Files uploaded successfully");
              if (itemSelected == null) setItemSelected([filesData]);
              else setItemSelected((prev) => [...prev, filesData]);
              setUploading(false);
              setUploadableFiles([]);
              clickOk();
            })
            .catch((ex) => {
              console.log(ex);
              generateNotification("error", "Failed to upload files!");
              setUploading(false);
            });
        })
        .catch((ex) => {
          console.log(ex);
          generateNotification("error", "Failed to upload files!");
          setUploading(false);
        });
    }

    // reader.readAsDataURL(fileData.filesList[i]);
    // }
  };

  function downloadBase64File(base64Data, fileName) {
    let linkSource = null;
    if (base64Data == null) return;

    if (base64Data.includes("data:file/png;base64")) linkSource = base64Data;
    else linkSource = `data:file/png;base64,${base64Data}`;

    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  function downloadURI(uri) {
    window.open(uri);
  }

  useEffect(() => {
    // handleGetBatonFilesSnapshotSnapshot(batonId, setUploadedFiles);
    if (itemSelected != null && batonId != null) {
      setUploadedFiles(itemSelected);
    }
    console.log("batonFiles useEffect", itemSelected?.length);
  }, [itemSelected?.length]);

  return (
    <>
      <Dragger {...props} fileList={uploadableFiles}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: boxColor }} />
        </p>
        <p className="ant-upload-text">Drag and drop here</p>
        <p>or</p>
        <p className="ant-upload-hint">BROWSE OR SELECT FILES</p>
      </Dragger>

      {uploading == true && uploading != "b64Converted" ? (
        <CustomLoading size="large" className="mt-3" color={colors.mosque} />
      ) : (
        <>
          <div className="mt-5">
            <h6>
              {uploadedFiles.length + uploadableFiles.length} files attached
            </h6>
          </div>
          {uploadedFiles.length > 0 && (
            <List
              itemLayout="horizontal"
              dataSource={uploadedFiles}
              renderItem={(item) => (
                <DownloadDiv
                  className="px-3"
                  style={{ backgroundColor: colors.cgLight95 }}
                  onClick={() => downloadURI(item.file, item.fileName)}
                >
                  <List.Item>
                    <List.Item.Meta
                      avatar={<FileOutlined />}
                      title={<label>{item.fileName}</label>}
                    />
                    <DownloadOutlined />
                  </List.Item>
                </DownloadDiv>
              )}
            />
          )}
          <TealButton
            onClick={handleUpload}
            disabled={itemSelected?.length === 0 || uploading == "b64Converted"}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading == "b64Converted" ? "Uploaded " : "Upload"}
          </TealButton>
        </>
      )}
    </>
  );
}

const DownloadDiv = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const CustomLoading = styled(Loading)`
  &.ant-spin {
    color: ${(props) => props.color};
  }
`;
