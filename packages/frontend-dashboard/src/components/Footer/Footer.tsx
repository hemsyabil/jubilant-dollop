import { Box, Typography } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body2" color="" align="center">
        © {new Date().getFullYear()} All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
