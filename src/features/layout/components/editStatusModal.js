import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
};

const EditStatusModal = (props) => {
  const [editedStatus, setEditedStatus] = useState("");

  const handleSave = () => {
    props.setIsLoading(true);

    fetch(`http://localhost:3000/status/${props.statusId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: editedStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Status updated successfully") {
          // alert("Status updated !");
          setEditedStatus("");
          props.setModalOpen(false);
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
            Edit Status
          </Typography>
          <Typography
            style={{
              paddingTop: "10px",
              wordWrap: "break-word",
              textAlign: "start",
            }}
          >
            Current Status: {props.currentStatus}
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
              id="editStatus"
              label="Edit Status"
              value={editedStatus}
              onChange={(e) => {
                setEditedStatus(e.target.value);
              }}
              variant="outlined"
              multiline
              minRows={3}
              maxRows={4}
            />
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
              onClick={() => props.setModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditStatusModal;
