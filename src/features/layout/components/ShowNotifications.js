import React from "react";
import Typography from "@mui/material/Typography";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import "../../Style/Style.css";
import { timeAgo } from "../../Utils/Utils";
import { BASE_URL_FRONTEND } from "../../../Services/helper";

const ShowNotifications = (props) => {
  const getUserProfile = (uId) => {
    window.location.href = `${BASE_URL_FRONTEND}/userDetails/${uId}`;
  };
  const goToStatus = (statusId) => {
    window.location.href = `${BASE_URL_FRONTEND}/status/${statusId}`;
  };
  const goToComment = (commentId) => {
    window.location.href = `${BASE_URL_FRONTEND}/comment/${commentId}`;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="smallCircle">
            <img
              src={props.notification.fromImage}
              alt="dp"
              onClick={(e) => {
                e.preventDefault();
                getUserProfile(props.notification.fromId);
              }}
            />
          </div>
          &nbsp;
          <Typography
            onClick={(e) => {
              e.preventDefault();
              getUserProfile(props.notification.fromId);
            }}
            sx={{
              fontSize: "20px",
              color: "blue",
              cursor: "pointer",
            }}
          >
            {props.notification.fromUsername}
          </Typography>
          &nbsp;
          <Typography
            sx={{
              fontSize: "20px",
            }}
          >
            {props.notification.activity === "status like" ||
            props.notification.activity === "comment like"
              ? "liked your"
              : props.notification.activity === "add comment"
              ? "added a new"
              : "started following you"}
          </Typography>
          &nbsp;
          <Typography
            sx={{
              fontSize: "20px",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (props.notification.activity === "status like") {
                goToStatus(props.notification.contentId);
              } else if (
                props.notification.activity === "comment like" ||
                props.notification.activity === "add comment"
              ) {
                goToComment(props.notification.contentId);
              }
            }}
          >
            {props.notification.activity === "status like"
              ? "status."
              : props.notification.activity === "comment like" ||
                props.notification.activity === "add comment"
              ? "comment."
              : ""}
          </Typography>
          &nbsp;
          {props.isNew && <FiberNewIcon />}
        </div>
        <div>
          <Typography>({timeAgo(props.notification.time)})</Typography>
        </div>
      </div>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "black",
          width: "100%",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      />
    </>
  );
};

export default ShowNotifications;
