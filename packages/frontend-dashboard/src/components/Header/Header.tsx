import { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Avatar,
  Tooltip,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import LoginIcon from '@mui/icons-material/Login';
import { ColorModeContext } from '../../styles/ColorModeContext';
import { useTheme } from '@mui/material/styles';
import './Header.css';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.background.default
            : theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 'var(--box-shadow)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          className="header-toolbar"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
          }}
        >
          {/* Left: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: 'grey.300',
                width: 500,
                height: 60,
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="text.primary">
                Image
              </Typography>
            </Avatar>
          </Box>

          {/* Middle: Navigation */}
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: 500 }}>
              Overview
            </Typography>
            <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: 500 }}>
              Inventory
            </Typography>
          </Box>

          {/* Right: Icon actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            {/* Mode toggle */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                onClick={colorMode.toggleColorMode}
                color="inherit"
                size="small"
              >
                {theme.palette.mode === 'dark' ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
              <Typography variant="caption">Mode</Typography>
            </Box>

            {/* Language */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                size="small"
              >
                <LanguageIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption">Language</Typography>
            </Box>

            {/* Login */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                size="small"
              >
                <LoginIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption">Login</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
