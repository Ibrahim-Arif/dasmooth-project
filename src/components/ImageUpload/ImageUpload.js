import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import { handleUploadImages } from "../../services";
import Loading from "../Loading/Loading";

const { Dragger } = Upload;
// https://prismasoft.medium.com/multiple-files-upload-to-firebase-in-react-using-ant-design-65ba671d9af5
// use above link to for firebase file uploads

export default function ImageUpload({
  boxColor,
  itemSelected,
  setItemSelected,
  setFilesListB64,
  clickOk,
}) {
  const [imageData, setImageData] = useState({
    fileList: itemSelected.filesList,
  });

  const [uploading, setUploading] = useState(false);
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
  const handleUpload = () => {
    setUploading(true);

    console.log(imageData.fileList);
    let b64 = [];
    imageData.fileList.map((e) => {
      getBase64(e, (item) => b64.push(item));
    });
    console.log(b64);
    // setItemSelected({uploading:false,fileList:[...b64]})
    setFilesListB64(b64)
    setUploading("b64Converted")
    clickOk()
  };

  const getBase64 = (file, addItem) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result);
      addItem(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  useEffect(
    () =>
      imageData.fileList.length == 0
        ? setItemSelected({
            filesList: imageData.fileList,
            text: "Attach a file",
          })
        : setItemSelected({
            filesList: imageData.fileList,
            text: `${imageData.fileList.length} files attached`,
          }),
    [imageData]
  );
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
      <Dragger {...props} defaultFileList={itemSelected.filesList}>
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
      {uploading  == true && uploading != "b64Converted"? (
        <Loading size="large" />
      ) : (
      
        <TealButton
          onClick={handleUpload}
          disabled={imageData.fileList.length === 0 || uploading == "b64Converted"}
          loading={imageData.uploading}
          style={{ marginTop: 16 }}
        >
          {uploading == "b64Converted" ? "Uploaded ": "Upload"}
        </TealButton>
      )}
    </>
  );
}
