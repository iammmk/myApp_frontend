import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 330,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
  borderRadius: 5,
};

// to edit status or comment
const ViewEditModal = (props) => {
  return (
    <div>
      <Modal
        open={props.modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{
              paddingTop: "10px",
              wordWrap: "break-word",
              textAlign: "start",
            }}
          >
            <Typography variant="h6">Current:</Typography>
            <Typography>{props.current}</Typography>
          </Typography>
          <Typography
            style={{
              paddingTop: "10px",
              wordWrap: "break-word",
              textAlign: "start",
            }}
          >
            <Typography variant="h6">Prev:</Typography>
            <Typography>{props.prev}</Typography>
          </Typography>
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
              onClick={() => {
                props.setModalOpen(false);
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

export default ViewEditModal;
