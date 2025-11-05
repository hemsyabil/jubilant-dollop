import React from "react";
import { Box, Typography } from "@mui/material";
import "./../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <Box className="footer">
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} My Inventory App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
