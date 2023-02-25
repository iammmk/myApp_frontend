import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField } from "@mui/material";
import { BASE_URL } from "../helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
};

const AddCommentsModal = (props) => {
  const [newComment, setNewComment] = useState("");

  const handleSave = () => {
    props.setIsLoading(true);

    fetch(`${BASE_URL}/status/${props.status._id}/comment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        comment: newComment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Added new comment") {
          // alert("Status updated !");
          setNewComment("");
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
            Add Comment
          </Typography>
          <Typography
            style={{
              paddingTop: "10px",
              wordWrap: "break-word",
              textAlign: "start",
            }}
          >
            {props.status.uploadedBy}:{" "}
            {props.parentType === "Status"
              ? props.status.status
              : props.status.comment}
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "42ch" },
            }}
            style={{
              position: "absolute",
              bottom: "80px",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="addComment"
              label="Add Comment"
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
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
              Add
            </Button>{" "}
            &nbsp;
            <Button
              variant="contained"
              onClick={() => {
                props.setModalOpen(false);
                setNewComment("");
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

export default AddCommentsModal;
