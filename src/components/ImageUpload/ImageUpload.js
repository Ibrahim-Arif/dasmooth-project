import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import Loading from "../Loading/Loading";
import { handleAddBatonFiles } from "../../services";
import { generateNotification } from "../../utilities/generateNotification";
import { v4 } from "uuid";

const { Dragger } = Upload;
// https://prismasoft.medium.com/multiple-files-upload-to-firebase-in-react-using-ant-design-65ba671d9af5
// use above link to for firebase file uploads

export default function ImageUpload({
  boxColor,
  itemSelected,
  setItemSelected,
  batonId,
  clickOk,
}) {
  const [imageData, setImageData] = useState({filesList:[]});
  const [uploading, setUploading] = useState(false);

  const props = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      setImageData((imageData) => ({
        filesList: [...imageData.filesList, file],
      }));

      return false;
    },
    onRemove: (file) => {
      setImageData((imageData) => {
        const index = imageData.filesList.indexOf(file);
        const newFileList = imageData.filesList.slice();
        newFileList.splice(index, 1);
        return {
          filesList: newFileList,
        };
      });
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleUpload = () => {
    setUploading(true);

    // console.log(imageData);
    let b64 = [];
  
    // imageData.filesList.map((e) => {
    // });
    for(let  i = 0;i<imageData.filesList.length;i++){
      var reader = new FileReader();

      reader.onloadend = function() {
      // b64.push(reader.result)
        let imagesData = {[v4()]: reader.result, batonId:batonId};
   
        handleAddBatonFiles(imagesData).then(()=>{
          generateNotification("success", "Images uploaded successfully");
          setUploading(false);
          clickOk();
        }).catch(ex=>{
          generateNotification("error", ex.message);  
          setUploading(false);})
        };

        reader.readAsDataURL(imageData.filesList[i]);
      }
     
      // getBase64(imageData.filesList[i], (item) => b64.push(item));
    }
    // console.log(b64);
    // return;
    // console.log(imagesData);
    // return;

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
    () =>{
      console.log(imageData)
      if(imageData.filesList.length == 0)
      setItemSelected({
        filesList: imageData,
        text: "Attach a file",
      });
      else 
      setItemSelected({
        filesList: imageData,
        text: `${imageData.filesList.length} files attached`,
      });
    },
    [imageData]
  );
  
  return (
    <>
      <Dragger {...props} defaultFileList={imageData.filesList} value>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: boxColor }} />
        </p>
        <p className="ant-upload-text">Drag and drop here</p>
        <p>or</p>
        <p className="ant-upload-hint">BROWSE OR SELECT FILES</p>
      </Dragger>

      <div className="mt-5">
        <h6>{imageData.length} files attached</h6>
      </div>
      {uploading  == true && uploading != "b64Converted"? (
        <Loading size="large" />
      ) : (
      
        <TealButton
          onClick={handleUpload}
          disabled={imageData.length === 0 || uploading == "b64Converted"}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading == "b64Converted" ? "Uploaded ": "Upload"}
        </TealButton>
      )}
    </>
  );
}
