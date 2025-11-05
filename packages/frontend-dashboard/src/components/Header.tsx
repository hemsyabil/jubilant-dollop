import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import "./../styles/Header.css";

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary" className="header">
      <Toolbar className="toolbar">
        {/* Left: Logo */}
        <Box display="flex" alignItems="center">
          <img
            src="/logo192.png"
            alt="Logo"
            style={{ width: 40, height: 40, marginRight: "10px" }}
          />
        </Box>

        {/* Middle: Title */}
        <Typography variant="h6" className="title">
          Hello from Header
        </Typography>

        {/* Right: Icons/User */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2">Dark Mode</Typography>
          <Typography variant="body2">EN</Typography>
          <IconButton>
            <Avatar alt="User" src="/user.png" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
