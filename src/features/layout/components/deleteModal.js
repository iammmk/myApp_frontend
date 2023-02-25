import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button } from "@mui/material";
import { BASE_URL } from "../helper";

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
};

const DeleteModal = (props) => {
  const handleDelete = () => {
    props.setIsLoading(true);

    let deleteAPI =
      props.type === "Status"
        ? `${BASE_URL}/status/${props.statusId}`
        : `${BASE_URL}/comment/${props.statusId}`;

    fetch(deleteAPI, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Deleted") {
          // alert("status deleted !");
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
            Delete {props.type}
          </Typography>
          <div style={{ padding: "25px" }}>
            <Typography>{props.message}</Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleDelete}>
              Delete
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

export default DeleteModal;
