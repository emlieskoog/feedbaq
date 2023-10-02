import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Fade,
  Link,
} from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TemporaryDrawer from "./drawer";

export default function Header() {

  return (
    <AppBar position="relative" >
      <Toolbar>
        <TemporaryDrawer />
        <img
          src="/HiQ_logo_white.png"
          alt="HiQ Logo"
          style={{ height: "35px", marginLeft: "15px", marginRight: "15px" }}
        ></img>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Kvalitetsuppföljning
        </Typography>

      </Toolbar>
    </AppBar >
  );
}
