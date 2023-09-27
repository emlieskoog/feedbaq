import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from 'next/link';


export default function Header() {

  const handleLogout = () => {
    localStorage.removeItem('myData');
    const sessionData = localStorage.getItem('myData');
    console.log("Session Data has been cleared");
    console.log("Session Data:", sessionData);

  };

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
          <Link href="/">
            <Button color="inherit" onClick={handleLogout}>
              Logga ut
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
