import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField } from "@mui/material";
import AddPhoto from "../../Utils/AddPhoto";
import AddEmoji from "../../Utils/AddEmoji";
import { BASE_URL } from "../../../Services/helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
  borderRadius: 5,
};

const AddStatusModal = (props) => {
  const [newStatus, setNewStatus] = useState("");
  const [statusPic, setStatusPic] = useState(null);
  const [photoAdd, setPhotoAdd] = useState(false);

  const handleSave = () => {
    props.setModalOpen(false);
    props.setIsLoading(true);
    fetch(`${BASE_URL}/status`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
        statusImage: statusPic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Added new status !!") {
          // alert("Status updated !");
          setNewStatus("");
          setPhotoAdd(false);
          props.getAllStatus();
          props.setIsLoading(false);
        }
      });
  };

  return (
    <div>
      <Modal
        open={props.modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add Status
          </Typography>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "46ch" },
            }}
            style={{
              position: "absolute",
              bottom: "80px",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="newStatus"
              label="New Status"
              value={newStatus}
              onChange={(e) => {
                setNewStatus(e.target.value);
              }}
              variant="outlined"
              multiline
              minRows={3}
              maxRows={4}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Photo add option */}
                <AddPhoto
                  photoAdd={photoAdd}
                  setPhotoAdd={setPhotoAdd}
                  setStatusPic={setStatusPic}
                />
                {/* Emoji add option */}
                <AddEmoji newContent={newStatus} setNewContent={setNewStatus} />
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
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!newStatus}
            >
              Post
            </Button>{" "}
            &nbsp;
            <Button
              variant="contained"
              onClick={() => {
                props.setModalOpen(false);
                setNewStatus("");
                setPhotoAdd(false);
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

export default AddStatusModal;
