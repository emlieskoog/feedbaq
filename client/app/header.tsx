import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="/HiQ_logo_white.png"
            alt="HiQ Logo"
            style={{ height: "35px", marginRight: "15px" }}
          ></img>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Kvalitetsuppföljning
          </Typography>
          <Button color="inherit" href="/">
            Logga ut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
