import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField } from "@mui/material";
import { BASE_URL } from "../helper";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 490,
  height: 525,
  bgcolor: "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
};

const SignupModal = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //password visibilty
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //confirm-password visibilty
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  // signup
  const handleCreate = () => {
    fetch(`${BASE_URL}/signup`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Signup successful !") {
          alert("Registration Successful");
          // window.location.href = "./sign-in";
          setAllFieldsClear();
          props.setModalOpen(false);
        } else {
          alert("Something went wrong");
        }
      });
  };

  const setAllFieldsClear = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
            Create your account
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "46ch" } }}
            style={{
              position: "absolute",
              bottom: "80px",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="name"
              label="Name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              variant="outlined"
              multiline
              rows={1}
            />
            <TextField
              id="username"
              label="Username"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              variant="outlined"
              multiline
              rows={1}
            />
            <TextField
              id="email"
              label="E-mail"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              variant="outlined"
              multiline
              rows={1}
            />
            <FormControl sx={{ m: 1, width: "46ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "46ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: "30px",
              paddingRight: "10px",
              position: "absolute",
              right: "0",
              bottom: "0",
            }}
          >
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{ paddingRight: "15px" }}
            >
              Sign Up
            </Button>{" "}
            &nbsp;
            <Typography>Already registered?</Typography>
            <a
              href="/#"
              style={{ textDecoration: "none" }}
              onClick={(e) => {
                e.preventDefault();
                setAllFieldsClear();
                props.setModalOpen(false);
              }}
            >
              <Typography>Sign in</Typography>
            </a>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SignupModal;
