import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
};

const AddStatusModal = (props) => {
  const [newStatus, setNewStatus] = useState("");

  const handleSave = () => {
    // props.setIsLoading(true);

    fetch("http://localhost:3000/status", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Added new status !!") {
          // alert("Status updated !");
          setNewStatus("");
          props.setModalOpen(false);
          props.getAllStatus();
          //   props.setIsLoading(false);
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
              Post
            </Button>{" "}
            &nbsp;
            <Button
              variant="contained"
              onClick={() => {
                props.setModalOpen(false);
                setNewStatus("");
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
