import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/common/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, Container } from '@mui/material';


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "black"
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            width: "500px",
            minHeight: "100vh",
            backgroundColor: "white",
            padding: 2
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route element={<ProtectedRoute />}>
              </Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </Box>
    </QueryClientProvider>
  )
}

export default App;
