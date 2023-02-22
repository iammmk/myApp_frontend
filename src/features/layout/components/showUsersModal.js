import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 390,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
};

const showUsersModal = (props) => {
  const getUserProfile = (e, userId) => {
    e.preventDefault();
    window.location.href = `http://localhost:8080/userDetails/${userId}`;
  };

  return (
    <div>
      <Modal
        open={props.showUsersModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {props.title}&nbsp;({props.count})
          </Typography>
          <Divider variant="middle" />
          {props.peopleList.length ? (
            props.peopleList.map((item) => (
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  getUserProfile(e, item._id);
                }}
                style={{ textDecoration: "none", paddingTop: "15px" }}
              >
                <Typography>
                  {item.name}&nbsp;({item.username})
                </Typography>
              </a>
            ))
          ) : (
            <>
              <Typography>No data</Typography>
            </>
          )}

          <Button
            variant="contained"
            onClick={() => {
              props.setShowUsersModalOpen(false);
            }}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "10px",
              paddingRight: "10px",
              position: "absolute",
              right: "10px",
              bottom: "10px",
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default showUsersModal;
