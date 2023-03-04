import React from "react";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Tooltip from "@mui/material/Tooltip";

const AddPhoto = (props) => {
  //handle and convert it in base 64
  const handleStatusPic = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onloadend = () => {
      props.setStatusPic(reader.result);
    };
  };

  return (
    <>
      <Tooltip title="Add a photo" placement="top-start">
        <IconButton
          style={{ cursor: "pointer" }}
          onClick={() => props.setPhotoAdd(!props.photoAdd)}
        >
          <AddAPhotoIcon />
        </IconButton>
      </Tooltip>
      {props.photoAdd && (
        <input
          type="file"
          accept="image/*"
          id="formupload"
          name="image"
          className="form-control"
          onChange={handleStatusPic}
          style={{ width: "300px", marginLeft: "10px" }}
        />
      )}
    </>
  );
};

export default AddPhoto;
