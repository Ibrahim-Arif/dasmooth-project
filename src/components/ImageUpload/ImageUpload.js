import React, { useState } from "react";
import { Upload, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
// https://prismasoft.medium.com/multiple-files-upload-to-firebase-in-react-using-ant-design-65ba671d9af5
// use above link to for firebase file uploads

export default function ImageUpload({ boxColor }) {
  const [imageData, setImageData] = useState({
    fileList: [],
    uploading: false,
  });
  const props = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      setImageData((imageData) => ({
        fileList: [...imageData.fileList, file],
      }));
      return false;
    },
    onRemove: (file) => {
      setImageData((imageData) => {
        const index = imageData.fileList.indexOf(file);
        const newFileList = imageData.fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
      });
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  // const props = {
  //   onRemove: (file) => {
  //     setImageData((imageData) => {
  //       const index = imageData.fileList.indexOf(file);
  //       const newFileList = imageData.fileList.slice();
  //       newFileList.splice(index, 1);
  //       return {
  //         fileList: newFileList,
  //       };
  //     });
  //   },
  //   beforeUpload: (file) => {
  //     setImageData((imageData) => ({
  //       fileList: [...imageData.fileList, file],
  //     }));
  //     return false;
  //   },
  //   fileList: imageData.fileList,
  // };
  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: boxColor }} />
        </p>
        <p className="ant-upload-text">Drag and drop here</p>
        <p>or</p>
        <p className="ant-upload-hint">BROWSE OR SELECT FILES</p>
      </Dragger>

      <div className="mt-5">
        <h6>{imageData.fileList.length} files attached</h6>
      </div>
      <Button
        // onClick={this.handleUpload}
        disabled={imageData.fileList.length === 0}
        loading={imageData.uploading}
        style={{ marginTop: 16 }}
      >
        {imageData.uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
}
