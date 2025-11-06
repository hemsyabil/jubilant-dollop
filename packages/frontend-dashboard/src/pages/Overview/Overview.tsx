import { Typography, Box, Container } from "@mui/material";
import { useTranslation } from 'react-i18next';
import './Overview.css';

const Overview = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Container>
        <Typography variant="h4">{t('overview')}</Typography>
        </Container>
      
    </Box>
  );
};

export default Overview;
