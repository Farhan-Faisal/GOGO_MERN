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


 // Ensure this path is correct
// import  Icon  from 'react-icons-kit';
import { eye } from 'react-icons-kit/ionicons/eye';

import configData from "../../../config.json";
import GoogleAuthButton from './GoogleAuthButton';
import StatelessPopup from '../../common/StatelessPopup';
import { styles } from './signupForm.styles';



export default function SignupForm({ signedUpCallback }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [cantSignUp, setCantSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [pwdIcon, setIcon] = useState(eye);

  const throwErrMsg = (emsg) => {
    setCantSignUp(true);
    setMsg(emsg);
  };

  // const handleVisible = () => {
  //   setVisible((prev) => !prev);
  //   setIcon(visible ? eye : eyeDisabled);
  // };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!email) return throwErrMsg('Please enter a valid email address.');
    if (!password) return throwErrMsg('Please enter a password.');
    if (!username) return throwErrMsg('Please enter a username.');

    try {
      const res = await fetch(`${configData.SERVER_URL}/email-auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();

      if (data.msg === 'user created') {
        signedUpCallback(email, username);
      } else if (data?.err?.message) {
        throwErrMsg(data.err.message);
        console.log(data.err);
      } else if (data.msg === 'email taken') {
        throwErrMsg('Email is already registered, try Logging in');
      }
    } catch (error) {
      throwErrMsg('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <Box sx={styles.container}>

      <StatelessPopup trigger={cantSignUp} setTrigger={setCantSignUp}>
        <div className={styles.wrappableText}>{msg}</div>
      </StatelessPopup>

      <Box component="form" onSubmit={onSubmit} sx={styles.form}>
        <Typography variant="h5" fontWeight="bold" color="#AD03DE" textAlign="center">
          SIGN UP
        </Typography>

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

        <TextField
          variant="outlined"
          fullWidth
          label="Username"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
        />


        <Button variant="contained" type="submit" fullWidth sx={styles.loginButton}>
          Sign Up
        </Button>

        <Divider sx={styles.dividerContainer}>
          <Typography variant="body2" color="#fff">
            or
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
          <GoogleAuthButton />

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
          Alrady have an account?{' '}
          <Button variant="text" onClick={() => router.push('/login')} sx={{ color: '#df6cff' }}>
            Login
          </Button>
        </Typography>
      </Box>
    </Box>

  );
}
