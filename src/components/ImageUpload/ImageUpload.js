import React, { useEffect, useState } from "react";
import { Upload ,List} from "antd";
import { DownloadOutlined, FileOutlined, InboxOutlined } from "@ant-design/icons";
import { TealButton } from "../FormButton/FormButton";
import Loading from "../Loading/Loading";
import { handleAddBatonFiles, handleGetBatonFiles } from "../../services";
import { generateNotification } from "../../utilities/generateNotification";
import { v4 } from "uuid";
import { colors } from "../../utilities/colors";

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
  const [uploadedFiles,setUploadedFiles] = useState([]);
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
    if(batonId == null)
    {
      generateNotification("error", "Error", "Please pass a baton first");
      return;
    }
    setUploading(true);

    for(let  i = 0;i<imageData.filesList.length;i++){
      var reader = new FileReader();

      reader.onloadend = function() {
      // b64.push(reader.result)
        let imagesData = {image: reader.result, batonId:batonId,fileName:imageData.filesList[i].name};
   
        handleAddBatonFiles(imagesData).then(()=>{
          generateNotification("success", "Images uploaded successfully");
          setUploading(false);
          clickOk();
        }).catch(ex=>{
          generateNotification("error", "Failed to upload files!");  
          setUploading(false);})
        };

        reader.readAsDataURL(imageData.filesList[i]);
      }
     
    }
  
    function downloadBase64File(base64Data, fileName) {
      const linkSource = `${base64Data}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
  }

  useEffect(
    () =>{
      console.log(imageData)
      if(imageData.filesList.length == 0 && uploadedFiles.length == 0)
      setItemSelected({
        filesList: imageData,
        text: "Attach a file",
      });
      else 
      setItemSelected({
        filesList: imageData,
        text: `${uploadedFiles.length} files attached`,
      });
    },
    [imageData,uploadedFiles]
  );
  useEffect(()=>{handleGetBatonFiles(batonId,setUploadedFiles)},[])
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
        <h6>{(imageData.length == undefined ? uploadedFiles.length : uploadedFiles.length+imageData.length)} files attached</h6>
      </div>
      {uploadedFiles.length > 0 && 

        <List
        itemLayout="horizontal"
        dataSource={uploadedFiles}
        renderItem={item => (    
          <List.Item className="px-3" style={{backgroundColor:colors.cgLight95}} onClick={()=>downloadBase64File(item.image,item.fileName)}>
          
            <List.Item.Meta       
              avatar={<FileOutlined/>}
              title={<label>{item.fileName}</label>}
              />
              <DownloadOutlined/>
          </List.Item>
      )}
  />
}
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
