import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField } from "@mui/material";
import AddPhoto from "../../Utils/AddPhoto";
import AddEmoji from "../../Utils/AddEmoji";
import { BASE_URL } from "../../../Services/helper";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

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
  borderRadius: 5,
};

const ChatModal = (props) => {
  const [newChat, setNewChat] = useState("");

  const handleSend = () => {
    props.setModalOpen(false);
    props.setIsLoading(true);
    fetch(`${BASE_URL}/chat`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        receiverId: props.receiverId,
        chat: newChat,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "new chat sent !!") {
          setNewChat("");
          //   props.getAllStatus();
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
        disableScrollLock
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            To: {props.receiverName}
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
              id="newchat"
              label="New Chat"
              value={newChat}
              onChange={(e) => {
                setNewChat(e.target.value);
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
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={!newChat}
            >
              Send
            </Button>{" "}
            &nbsp;
            <Button
              variant="contained"
              onClick={() => {
                props.setModalOpen(false);
                setNewChat("");
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

export default ChatModal;
