import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Tooltip from "@mui/material/Tooltip";

const AddEmoji = (props) => {
  const [showEmojis, setShowEmojis] = useState(false);

  return (
    <>
      <Tooltip title="Add emoji" placement="top-start">
        <IconButton onClick={() => setShowEmojis(!showEmojis)}>
          <EmojiEmotionsIcon />
        </IconButton>
      </Tooltip>
      {showEmojis && (
        <div
          style={{
            zIndex: "10000",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 0 1rem rgba(0, 0, 0, 0.3)",
            }}
          >
            <Picker
              data={data}
              onEmojiSelect={(e) => {
                props.setNewContent(props.newContent + e.native);
                setShowEmojis(!showEmojis);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmoji;
