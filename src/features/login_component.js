// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../Context";

// export default function Login() {
//   const history = useNavigate();
//   const [email, setEmail] = useState("");
//   const { ownerId, setOwnerId } = useContext(Context);
//   // const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     fetch("http://localhost:3000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.message === "Login successful!") {
//           alert("login successful");
//           window.localStorage.setItem("token", data.data);
//           window.localStorage.setItem("loggedIn", true);
//           window.localStorage.setItem("profileId", data.data._id);
//           let ownerId = data.data._id;
//           setOwnerId(ownerId)
//           history(`/home`);
//         }
//       });
//   }

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner">
//         <form onSubmit={handleSubmit}>
//           <h3>Sign In</h3>

//           <div className="mb-3">
//             <label>Email address</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter email id"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <div className="custom-control custom-checkbox">
//               <input
//                 type="checkbox"
//                 className="custom-control-input"
//                 id="customCheck1"
//               />
//               <label className="custom-control-label" htmlFor="customCheck1">
//                 Remember me
//               </label>
//             </div>
//           </div>

//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary">
//               Submit
//             </button>
//           </div>
//           <p className="forgot-password text-right">
//             <a href="/sign-up">Sign Up</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login successful!") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("profileId", data.data._id);
          window.localStorage.setItem("profileName", data.data.name);
          history(`/home`);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/images/applogo.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
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
              <Grid container justifyContent="flex-end" alignItems="center">
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
                  <Link
                    href="./sign-up"
                    variant="body2"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                  >
                    {" Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
