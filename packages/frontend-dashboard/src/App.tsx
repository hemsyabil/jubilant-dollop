import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container, Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container sx={{ flex: 1, mt: 4 }}>
        <h2>Welcome to Jubilant Dollop</h2>
      </Container>
      <Footer />
    </Box>
  );
};

export default App;
