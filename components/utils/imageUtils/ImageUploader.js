import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageUplodaer = ({data,setData,setImageUploadUrl}) => {
  const [selectedFile, setSelectedFile] = useState('');
  const [upload, setUpload] = useState(false);

  
  const fileSelectedHandler = (e) => {
   
    const file = e.target.files[0]
    const formData = new FormData();
   
    formData.append("upload_preset","nirthemagician");
    formData.append("file",file);
    setUpload(true);

    axios.post('https://api.cloudinary.com/v1_1/dscloud/image/upload', formData)
    .then((res) => {
      setData({...data, src: res.data.url}) 
      setImageUploadUrl(res.data.url)
    })
    .then(console.log('win'))
    .catch(e=> console.log(e))
  };



  return (
    <>
      <Button variant="contained" component="label" style={{ order: -1 }}>
        Upload Image
        <input type="file" onChange={fileSelectedHandler} hidden />
      </Button>
    
    </>
  );
};

export default ImageUplodaer;
