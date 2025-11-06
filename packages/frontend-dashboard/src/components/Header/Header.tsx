import { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import LoginIcon from '@mui/icons-material/Login';
import { ColorModeContext } from '../../styles/ColorModeContext';
import { useTheme } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<'EN' | 'FR'>('EN');
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = language === 'EN' ? 'FR' : 'EN';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleLogin = () => {
    navigate('/login');
  };

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
      <Container maxWidth="lg">
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
            <img
              alt="PNG here"
              src="https://picsum.photos/400/60/?blur"
              style={{ height: 50, borderRadius: 4 }}
            />
          </Box>

          {/* Middle: Navigation */}
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <NavLink to="/" className="header-menu">
              {t('overview')}
            </NavLink>
            <NavLink to="/inventory" className="header-menu">
              {t('inventory')}
            </NavLink>
          </Box>

          {/* Right: Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* Mode toggle */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton onClick={colorMode.toggleColorMode} color="inherit" size="small">
                {theme.palette.mode === 'dark' ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
              <Typography variant="caption">
                {theme.palette.mode === 'dark' ? t('dark') : t('light')}
              </Typography>
            </Box>

            {/* Language toggle */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton onClick={toggleLanguage} color="inherit" size="small">
                <LanguageIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption">{language}</Typography>
            </Box>

            {/* Login link */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton onClick={handleLogin} color="inherit" size="small">
                <LoginIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption">{t('login')}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
