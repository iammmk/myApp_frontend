import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, Divider } from "@mui/material";
import FollowButton from "./FollowButton";
import { BASE_URL } from "../helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 390,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
};

// modal to show who liked status/ whom you are following etc
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
          <div style={{ maxHeight: "calc(100% - 60px)", overflowY: "auto" }}>
            {props.peopleList.length ? (
              props.peopleList.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "50px",
                    paddingTop: "15px",
                  }}
                >
                  <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      getUserProfile(e, item._id);
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography>
                      {item.name}&nbsp;({item.username})
                    </Typography>
                  </a>
                  <FollowButton userData={item} updatePage={props.updatePage} />
                </div>
              ))
            ) : (
              <>
                <Typography>{props.message}</Typography>
              </>
            )}
          </div>
          <Divider
            variant="middle"
            sx={{
              position: "absolute",
              bottom: "55px",
              left: "0",
              right: "0",
            }}
          />
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
