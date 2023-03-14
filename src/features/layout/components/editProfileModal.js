import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Edit } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BASE_URL } from "../../../Services/helper";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ResetPhotoModal from "./ResetPhotoModal";
import { defaultCoverPhoto, defaultProfilePhoto } from "../../Utils/Utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 485,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
  borderRadius: 5,
};

const EditProfileModal = (props) => {
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [isBioEdited, setIsBioEdited] = useState(false);
  const [isDOBEdited, setIsDOBEdited] = useState(false);
  const [editedDOB, setEditedDOB] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [resetPhotoModalOpen, setResetPhotoModalOpen] = useState(false);
  const [profilePicSelected, setProfilePicSelected] = useState(false);
  const [editCoverPic, setEditCoverPic] = useState(false);
  const [editProfilePic, setEditProfilePic] = useState(false);

  // const handleSave = () => {
  //   props.setEditProfileModalOpen(false);
  //   props.setIsLoading(true);
  //   fetch(`${BASE_URL}/user/myProfile`, {
  //     method: "PUT",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: isNameEdited ? editedName : props.name,
  //       pImage: profilePic || props.pImage,
  //       bio: isBioEdited ? editedBio : props.bio,
  //       dob: isDOBEdited ? editedDOB : props.dob,
  //       coverPhoto: coverPic || props.coverPhoto,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.message === "User updated successfully !") {
  //         // alert("Profile updated !");
  //         props.getUserDetails();
  //         props.setIsLoading(false);
  //         setEditProfilePic(false);
  //         setEditCoverPic(false);
  //       } else {
  //         alert("Error occured");
  //       }
  //     });
  // };

  const handleSave = () => {
    props.setEditProfileModalOpen(false);
    props.setIsLoading(true);

    const reqBody = {
      ...(isNameEdited && { name: editedName }),
      ...(isBioEdited && { bio: editedBio }),
      ...(isDOBEdited && { dob: editedDOB }),
      ...(profilePic && { pImage: profilePic }),
      ...(coverPic && { coverPhoto: coverPic }),
    };

    fetch(`${BASE_URL}/user/myProfile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User updated successfully !") {
          // alert("Profile updated !");
          // props.getUserDetails();
          profilePic ? props.updatePage() : props.getUserDetails();
          isNameEdited &&
            window.localStorage.setItem("profileName", data.data.name);
          profilePic &&
            window.localStorage.setItem("profilePic", data.data.pImage);
          setIsNameEdited(false);
          setIsBioEdited(false);
          setIsDOBEdited(false);
          setProfilePic(null);
          setCoverPic(null);
          setEditProfilePic(false);
          setEditCoverPic(false);
          props.setIsLoading(false);
        } else {
          alert("Error occured");
        }
      });
  };

  //handle and convert it in base 64
  const handleCoverPic = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    // sometimes this readAsDataURL takes time so image doesnt chage.. should work on this
    await reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCoverPic(reader.result);
    };
  };

  //handle and convert it in base 64
  const handleProfilePic = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    // sometimes this readAsDataURL takes time so image doesnt chage.. should work on this
    await reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
  };

  return (
    <div>
      <Modal
        open={props.editProfileModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Edit Profile
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "49ch" },
            }}
            style={{
              position: "absolute",
              bottom: "80px",
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              {/* cover photo */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "7px",
                }}
              >
                <Typography> Cover Pic :</Typography>
                <Tooltip title="Edit Cover Pic" placement="top">
                  <IconButton
                    onClick={() => {
                      setEditCoverPic(!editCoverPic);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                {editCoverPic && (
                  <div className="form-outline " style={{ width: "305px" }}>
                    <input
                      type="file"
                      accept="image/*"
                      id="formupload"
                      name="image"
                      className="form-control"
                      onChange={handleCoverPic}
                    />
                  </div>
                )}
                {!editCoverPic && (
                  <Tooltip title="Reset Cover Pic" placement="top">
                    <IconButton
                      onClick={() => {
                        props.setEditProfileModalOpen(false);
                        setProfilePicSelected(false);
                        setResetPhotoModalOpen(true);
                        setEditedName(props.name);
                        setEditedBio(props.bio);
                        setEditedDOB(props.dob);
                        setEditProfilePic(false);
                        setEditCoverPic(false);
                      }}
                      disabled={props.coverPhoto === defaultCoverPhoto}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
              {/* profile photo */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "7px",
                }}
              >
                <Typography> Profile Pic: </Typography>
                <Tooltip title="Edit Profile Pic" placement="top-end">
                  <IconButton
                    onClick={() => {
                      setEditProfilePic(!editProfilePic);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                {editProfilePic && (
                  <div className="form-outline " style={{ width: "305px" }}>
                    <input
                      type="file"
                      accept="image/*"
                      id="formupload"
                      name="image"
                      className="form-control"
                      onChange={handleProfilePic}
                    />
                  </div>
                )}
                {!editProfilePic && (
                  <Tooltip title="Reset Profile Pic" placement="top-end">
                    <IconButton
                      onClick={() => {
                        props.setEditProfileModalOpen(false);
                        setProfilePicSelected(true);
                        setResetPhotoModalOpen(true);
                        setEditedName(props.name);
                        setEditedBio(props.bio);
                        setEditedDOB(props.dob);
                        setEditProfilePic(false);
                        setEditCoverPic(false);
                      }}
                      disabled={props.pImage === defaultProfilePhoto}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
              {/* name */}
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
              {/* bio */}
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
              {/* dob */}
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
                setEditProfilePic(false);
                setEditCoverPic(false);
              }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
      <ResetPhotoModal
        type={profilePicSelected ? "Profile Pic" : "Cover Pic"}
        modalOpen={resetPhotoModalOpen}
        setModalOpen={setResetPhotoModalOpen}
        setIsLoading={props.setIsLoading}
        getUserDetails={props.getUserDetails}
        updatePage={props.updatePage}
      />
    </div>
  );
};

export default EditProfileModal;
