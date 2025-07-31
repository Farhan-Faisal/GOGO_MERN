// app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';
import {
  IconButton,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  Box,
} from '@mui/material';
import configData from '../../../config.json';
import axios from 'axios';
import {styles} from './login.styles';


export default function LoginForm({
  loggedInCallBack,
  SignUpRedirect,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('userPic');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return setErrorMsg('Please enter Email');
    if (!password) return setErrorMsg('Please enter Password');

    try {
      const res = await axios.post(`${configData.SERVER_URL}/login`, { email, password });

      if (res.data.user) {
        localStorage.setItem('token', res.data.user.token);
        router.push(loggedInCallBack);
      } else {
        setErrorMsg(res.data.err);
      }
    } catch (error) {
      setErrorMsg('Login failed. Please try again.');
    }
  };

  return (
    <Box sx={styles.container}>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <Typography variant="h4" fontWeight="bold" color="#AD03DE" textAlign="center">
          LOGIN
        </Typography>

        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <TextField
          variant="outlined"
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
        />

        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
          sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
        />

        <Button variant="contained" type="submit" fullWidth sx={styles.loginButton}>
          Log in
        </Button>

        <Divider sx={styles.dividerContainer}>
          <Typography variant="body2" color="#fff">
            or login with
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            href={`${configData.SERVER_URL}/auth/google`}
            sx={styles.googleButton}
          >
            Google
          </Button>

          <Button
            variant="outlined"
            startIcon={<FacebookIcon />}
            href={`${configData.SERVER_URL}/auth/facebook`}
            sx={styles.facebookButton}
          >
            Facebook
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" color="#fff">
          Need an account?{' '}
          <Button variant="text" onClick={() => router.push(SignUpRedirect)} sx={{ color: '#df6cff' }}>
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
