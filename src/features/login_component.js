import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import SignupModal from "./layout/components/SignupModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL, BASE_URL_FRONTEND } from "../Services/helper";

// MUI login template
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailSelected, setIsEmailSelected] = useState(true);

  const [signupModalOpen, setSignupModalOpen] = useState(false);

  //password visibilty
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // signin
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let reqData = isEmailSelected
      ? { email: email, password: password }
      : { username: username, password: password };
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(reqData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login successful!") {
          // alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("profileId", data.data._id);
          window.localStorage.setItem("username", data.data.username);
          window.localStorage.setItem("profileName", data.data.name);
          window.localStorage.setItem("profilePic", data.data.pImage);
          sessionStorage.setItem("selectedItem", "home");

          // history(`/home`);
          window.location.href = `${BASE_URL_FRONTEND}/home`;
          setIsLoading(false);
        } else {
          alert("Login error");
          setIsLoading(false);
        }
      });
  };

  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <br />
            <div>
              <Typography sx={{ fontSize: "12px" }}>With</Typography>
              <Button
                variant="outlined"
                disabled={isEmailSelected}
                onClick={() => setIsEmailSelected(true)}
              >
                Email
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                disabled={!isEmailSelected}
                onClick={() => setIsEmailSelected(false)}
              >
                Username
              </Button>
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {isEmailSelected ? (
                <TextField
                  margin="normal"
                  required
                  sx={{ m: 1, width: "50ch" }}
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              ) : (
                <TextField
                  margin="normal"
                  required
                  sx={{ m: 1, width: "50ch" }}
                  // fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              )}
              <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                <Grid item style={{ display: "flex" }}>
                  <Typography style={{ fontSize: "15px" }}>
                    Don't have an account?
                  </Typography>
                  &nbsp;
                  <a
                    href="/#"
                    style={{ textDecoration: "none" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setSignupModalOpen(true);
                    }}
                  >
                    <Typography>Sign Up</Typography>
                  </a>
                  <SignupModal
                    modalOpen={signupModalOpen}
                    setModalOpen={setSignupModalOpen}
                    setIsLoading={setIsLoading}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default Login;
