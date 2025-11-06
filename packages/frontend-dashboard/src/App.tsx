import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1}>
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
