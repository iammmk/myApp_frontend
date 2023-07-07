import React, { useState } from "react";
import { Button, Grid, Typography, IconButton } from "@mui/material";
import { ArrowBack, Home, Search } from "@mui/icons-material";
import { BASE_URL_FRONTEND } from "../../../Services/helper";
import SearchModal from "./SearchModal";

const Headers = (props) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  return (
    <>
      <Grid
        container
        style={{
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "55%",
          backgroundColor: "#1976d2",
          color: "#fff",
          zIndex: "100",
          padding: "5px",
        }}
      >
        <Grid item>
          <Grid container alignItems={"center"}>
            <Grid item>
              <IconButton
                sx={{ color: "white" }}
                onClick={() =>
                  props.title === "Home"
                    ? (window.location.href = `${BASE_URL_FRONTEND}/home`)
                    : (window.location.href = "javascript:history.back()")
                }
              >
                {props.title === "Home" ? <Home /> : <ArrowBack />}
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>{props.title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="small"
            startIcon={<Search />}
            style={{ textTransform: "none" }}
            onClick={() => setSearchModalOpen(true)}
          >
            Find User
          </Button>
        </Grid>
      </Grid>
      <SearchModal
        modalOpen={searchModalOpen}
        setModalOpen={setSearchModalOpen}
      />
    </>
  );
};

export default Headers;
