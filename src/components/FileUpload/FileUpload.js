import React, { useEffect, useState } from "react";
import { Upload, List } from "antd";
import {
  DownloadOutlined,
  FileOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import Loading from "../Loading/Loading";
import {
  handleAddBatonFiles,
  handleGetBatonFiles,
  handleUploadFile,
} from "../../services";
import { generateNotification } from "../../utilities/generateNotification";
import { colors } from "../../utilities/colors";
import styled from "styled-components";
import { handleDownloadFile } from "../../services/handleDownloadFile";

const { Dragger } = Upload;

export default function FileUpload({
  boxColor,
  itemSelected,
  setItemSelected,
  batonId,
  clickOk,
}) {
  const [fileData, setFileData] = useState({ filesList: [] });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const props = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      setFileData((fileData) => ({
        filesList: [...fileData.filesList, file],
      }));

      return false;
    },
    onRemove: (file) => {
      setFileData((fileData) => {
        const index = fileData.filesList.indexOf(file);
        const newFileList = fileData.filesList.slice();
        newFileList.splice(index, 1);
        return {
          filesList: newFileList,
        };
      });
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleUpload = () => {
    if (fileData.filesList.length == 0) return;
    if (batonId == null) {
      generateNotification("error", "Error", "Baton Id is null");
      return;
    }
    setUploading(true);

    for (let i = 0; i < fileData.filesList.length; i++) {
      // var reader = new FileReader();

      // reader.onloadend = function () {
      // b64.push(reader.result)
      // let file = reader.result;

      // if (reader.result.includes("data:file/png;base64,"))
      //   file = reader.result.replace("data:file/png;base64,", "");
      // else file = reader.result;

      let file = fileData.filesList[i];
      handleUploadFile(file, fileData.filesList[i].name, batonId)
        .then((res) => {
          let filesData = {
            file: res,
            batonId: batonId,
            fileName: fileData.filesList[i].name,
          };

          console.log(filesData);
          // return;
          handleAddBatonFiles(filesData)
            .then(() => {
              generateNotification("success", "files uploaded successfully");
              setUploading(false);
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

    setFileData({ filesList: [] });
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
    // console.log(fileData);
    if (fileData.filesList.length == 0 && uploadedFiles.length == 0)
      setItemSelected({
        filesList: fileData,
        text: "Attach a file",
      });
    else
      setItemSelected({
        filesList: fileData,
        text: `${
          fileData.filesList.length + uploadedFiles.length
        } files attached`,
      });
  }, [fileData, uploadedFiles]);

  useEffect(() => {
    handleGetBatonFiles(batonId, setUploadedFiles);
  }, []);

  return (
    <>
      <Dragger {...props} fileList={fileData.filesList}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: boxColor }} />
        </p>
        <p className="ant-upload-text">Drag and drop here</p>
        <p>or</p>
        <p className="ant-upload-hint">BROWSE OR SELECT FILES</p>
      </Dragger>

      {uploading == true && uploading != "b64Converted" ? (
        <Loading size="large" className="mt-3" />
      ) : (
        <>
          <div className="mt-5">
            <h6>
              {uploadedFiles.length + fileData.filesList.length} files attached
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
            disabled={fileData.length === 0 || uploading == "b64Converted"}
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
