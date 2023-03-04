import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, Divider } from "@mui/material";
import FollowButton from "./FollowButton";
import { BASE_URL, BASE_URL_FRONTEND } from "../../../Services/helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 465,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
  borderRadius: 5,
};

// modal to show who liked status/ whom you are following etc
const showUsersModal = (props) => {
  const getUserProfile = (userId) => {
    window.location.href = `${BASE_URL_FRONTEND}/userDetails/${userId}`;
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
                    flexDirection: "column",
                    height: "80px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "45px",
                      flex: "1",
                    }}
                  >
                    <div className="smallCircle">
                      <img
                        src={item.pImage}
                        alt="dp"
                        onClick={(e) => {
                          e.preventDefault();
                          getUserProfile(item._id);
                        }}
                      />
                    </div>
                    <Typography
                      onClick={(e) => {
                        e.preventDefault();
                        getUserProfile(item._id);
                      }}
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "blue",
                        flex: "1",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <FollowButton
                      userData={item}
                      updatePage={props.updatePage}
                      setIsLoading={props.setIsLoading}
                      style={{
                        flex: "0 0 auto",
                      }}
                    />
                  </div>
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
