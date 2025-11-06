import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box className="footer">
      <Typography variant="body2" color="" align="center">
        © {new Date().getFullYear()} {t('footer_text')}
      </Typography>
    </Box>
  );
};

export default Footer;
