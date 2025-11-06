import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar className="header-toolbar">
        <Box className="header-left">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Inventory Overview
          </Typography>
        </Box>
        <Box className="header-right">
          <Button color="inherit" component={Link} to="/">Overview</Button>
          <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
          <Button color="inherit">Dark Mode</Button>
          <Button color="inherit">User</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
