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
  Avatar,
  Divider,
  ListItemIcon,
  Fade,
  Link,
  List,
  ListItem,
} from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem('myData');
    const sessionData = localStorage.getItem('myData');
    console.log("Session Data has been cleared");
    console.log("Session Data:", sessionData);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <img
          src="/HiQ_logo_white.png"
          alt="HiQ Logo"
          style={{ height: "35px", marginRight: "15px" }}
        ></img>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Kvalitetsuppföljning
        </Typography>
        <Tooltip title="Menu">
          <IconButton
            onClick={handleClick}
            size="large"
            color="inherit"
            sx={{ ml: 'auto' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" style={{ color: '#ff329f' }} />
            </ListItemIcon>
            <Link href="/account" variant="body2" onClick={handleClose} style={{ textDecoration: "none" }}>
              <ListItemText>Profil</ListItemText>
            </Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <Link href="#" variant="body2" onClick={handleClose} style={{ textDecoration: "none" }}>
              <ListItemText>Inställningar</ListItemText>
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Link href="/" variant="body2" onClick={handleLogout} style={{ textDecoration: "none" }}>
              <ListItemText>Logga ut</ListItemText>
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar >
  );
}
