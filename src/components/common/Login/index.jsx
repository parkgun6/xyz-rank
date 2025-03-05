import { TextField, Button, Box, Typography, Paper, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useLogin } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../../../atoms/atoms';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAtom(userAtom);
  const loginMutation = useLogin();
  const navigator = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  const handleBack = () => {
    navigator(-1); // 이전 페이지로 돌아가기
  };

  if (user) {
    navigator('/');
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
       <Paper
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: 3,
          position: "relative", 
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "black", 
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;