import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BASE_URL } from "../../../Services/helper";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 460,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
};

const EditProfileModal = (props) => {
  // const defaultDP = "https://cdn-icons-png.flaticon.com/128/552/552721.png";
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [isBioEdited, setIsBioEdited] = useState(false);
  const [isDOBEdited, setIsDOBEdited] = useState(false);
  const [editedDOB, setEditedDOB] = useState("");
  const [image, setImage] = useState([]);

  const handleSave = () => {
    props.setEditProfileModalOpen(false);
    props.setIsLoading(true);

    fetch(`${BASE_URL}/user/myProfile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: isNameEdited ? editedName : props.name,
        pImage: image.length?image : props.pImage,
        bio: isBioEdited ? editedBio : props.bio,
        dob: isDOBEdited ? editedDOB : props.dob,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User updated successfully !") {
          console.log(data.data.pImage);
          // alert("Profile updated !");
          props.getUserDetails();
          props.setIsLoading(false);
        } else {
          alert("Error occured");
        }
      });
  };

  //handle and convert it in base 64
  const handleImage = (e) => {
    console.log(props.pImage)
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <div>
      <Modal
        open={props.editProfileModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Edit Profile
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "42ch" },
            }}
            style={{
              position: "absolute",
              bottom: "80px",
              // overflow: "auto",
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ overflowY: "auto" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>Name:</Typography>
                <TextField
                  id="editName"
                  label="Edit Name"
                  value={isNameEdited ? editedName : props.name}
                  onChange={(e) => {
                    setIsNameEdited(true);
                    setEditedName(e.target.value);
                  }}
                  variant="outlined"
                  multiline
                  rows={1}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>Image:</Typography> &ensp;
                <div className="form-outline " style={{ width: "360px" }}>
                  <input
                    type="file"
                    accept="image/*"
                    id="formupload"
                    name="image"
                    className="form-control"
                    onChange={handleImage}
                  />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>Bio:</Typography>&ensp;&ensp;&nbsp;
                <TextField
                  id="editBio"
                  label="Edit Bio"
                  value={isBioEdited ? editedBio : props.bio}
                  onChange={(e) => {
                    setIsBioEdited(true);
                    setEditedBio(e.target.value);
                  }}
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>DOB:</Typography>&ensp;
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={isDOBEdited ? editedDOB : props.dob}
                    onChange={(newValue) => {
                      setIsDOBEdited(true);
                      setEditedDOB(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "10px",
              paddingRight: "10px",
              position: "absolute",
              right: "0",
              bottom: "0",
            }}
          >
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>{" "}
            &nbsp;
            <Button
              variant="contained"
              onClick={() => {
                props.setEditProfileModalOpen(false);
                // setEditedDOB(defaultDate);
                setEditedName(props.name);
                setEditedBio(props.bio);
                setEditedDOB(props.dob);
              }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProfileModal;
