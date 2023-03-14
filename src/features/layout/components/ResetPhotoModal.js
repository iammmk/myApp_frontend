import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button } from "@mui/material";
import { BASE_URL } from "../../../Services/helper";
import { defaultCoverPhoto, defaultProfilePhoto } from "../../Utils/Utils";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
  borderRadius: 5,
};

const ResetPhotoModal = (props) => {
  const handleReset = () => {
    props.setModalOpen(false);
    props.setIsLoading(true);

    let reqBody =
      props.type === "Cover Pic"
        ? { coverPhoto: defaultCoverPhoto }
        : { pImage: defaultProfilePhoto };

    fetch(`${BASE_URL}/user/myProfile/resetPhoto`, {
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
        if (data.message === "User photo updated successfully !") {
          // alert("Profile updated !");
          props.type === "Profile Pic" &&
            window.localStorage.setItem("profilePic", data.data.pImage);
          props.type === "Profile Pic"
            ? props.updatePage()
            : props.getUserDetails();
          props.setIsLoading(false);
        } else {
          alert("Error occured");
        }
      });
  };

  return (
    <div>
      <Modal
        open={props.modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Reset {props.type}
          </Typography>
          <div style={{ padding: "25px" }}>
            <Typography>Do you want to reset your {props.type}?</Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>{" "}
            &nbsp;
            <Button
              variant="contained"
              onClick={() => props.setModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ResetPhotoModal;
