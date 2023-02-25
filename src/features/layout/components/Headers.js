import React from "react";
import { Typography, IconButton } from "@mui/material";
import { ArrowBack, Home } from "@mui/icons-material";
import { BASE_URL } from "../../../Services/helper";

const Headers = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "55%",
        backgroundColor: "rgb(144 137 137)",
        color: "#fff",
        zIndex: "100",
        padding: "5px",
      }}
    >
      {props.isHome ? (
        <IconButton onClick={() => (window.location.href = `${BASE_URL_FRONTEND}/home`)}>
          <Home />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => (window.location.href = "javascript:history.back()")}
        >
          <ArrowBack />
        </IconButton>
      )}
      <Typography>{props.title}</Typography>
    </div>
  );
};

export default Headers;
