import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { BASE_URL_FRONTEND } from "../../../Services/helper";

const ShowNotifications = (props) => {
  const history = useNavigate();
  const getUserProfile = (uId) => {
    history(`/userDetails/${uId}`);
  };
  const goToStatus = (statusId) => {
    history(`/status/${statusId}`);
  };
  const goToComment = (commentId) => {
    window.location.href = `${BASE_URL_FRONTEND}/comment/${commentId}`;
  };
  return props.notification.activity === "status like" ? (
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
            liked your
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
              goToStatus(props.notification.contentId);
            }}
          >
            status.
          </Typography>
          &nbsp;
          {props.isNew && <FiberNewIcon />}
        </div>
        <div>
          <Typography>
            ({new Date(props.notification.time).toLocaleString()})
          </Typography>
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
  ) : props.notification.activity === "comment like" ? (
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
          <Typography
            sx={{
              fontSize: "20px",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              getUserProfile(props.notification.fromId);
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
            liked your
          </Typography>{" "}
          &nbsp;
          <Typography
            onClick={(e) => {
              e.preventDefault();
              goToComment(props.notification.contentId);
            }}
            sx={{
              fontSize: "20px",
              color: "blue",
              cursor: "pointer",
            }}
          >
            comment.
          </Typography>
          &nbsp;
          {props.isNew && <FiberNewIcon />}
        </div>
        <div>
          <Typography>
            ({new Date(props.notification.time).toLocaleString()})
          </Typography>
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
  ) : props.notification.activity === "add comment" ? (
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
          <Typography
            sx={{
              fontSize: "20px",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              getUserProfile(props.notification.fromId);
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
            added a new
          </Typography>{" "}
          &nbsp;
          <Typography
            onClick={(e) => {
              e.preventDefault();
              goToComment(props.notification.contentId);
            }}
            sx={{
              fontSize: "20px",
              color: "blue",
              cursor: "pointer",
            }}
          >
            comment.
          </Typography>
          &nbsp;
          {props.isNew && <FiberNewIcon />}
        </div>
        <div>
          <Typography>
            ({new Date(props.notification.time).toLocaleString()})
          </Typography>
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
  ) : (
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
          </Typography>{" "}
          &nbsp;
          <Typography
            sx={{
              fontSize: "20px",
            }}
          >
            started following you.
          </Typography>
          &nbsp;
          {props.isNew && <FiberNewIcon />}
        </div>
        <div>
          <Typography>
            ({new Date(props.notification.time).toLocaleString()})
          </Typography>
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
