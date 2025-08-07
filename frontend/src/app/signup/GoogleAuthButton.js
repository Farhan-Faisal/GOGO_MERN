'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import configData from '../../../config.json';
import AccountSetup from './AccountSetup';

export default function GoogleAuthButton() {
  const router = useRouter();
  const gsiDivRef = useRef(null);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [openAccountSetup, setOpenAccountSetup] = useState(false);

  const handleCallbackResponse = (res) => {
    try {
      const { email, name } = jwtDecode(res.credential);
      setEmail(email);
      setUsername(name);

      axios
        .post(`${configData.SERVER_URL}/login/google/check`, { email })
        .then((r) => {
          if (!r.data?.user) {
            // new user -> go to AccountSetup flow
            setOpenAccountSetup(true);
          } else {
            localStorage.setItem('token', r.data.user.token);
            router.push('/requests');
          }
        })
        .catch((err) => {
          console.error('google/check error:', err);
        });
    } catch (e) {
      console.error('JWT decode failed:', e);
    }
  };

  // Initializes and renders the Google button after script load
  const initGsi = () => {
    if (typeof window === 'undefined' || !window.google || !gsiDivRef.current) return;

    window.google.accounts.id.initialize({
      client_id: '510630290433-jlt1q0ippvmfqf7136astu46islidkgc.apps.googleusercontent.com',
      callback: handleCallbackResponse,
      ux_mode: 'popup',
    });

    // Render the button into a DIV (not a MUI Button)
    window.google.accounts.id.renderButton(gsiDivRef.current, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      shape: 'pill',
      logo_alignment: 'left'
    });

    // Optional: show One Tap
    // window.google.accounts.id.prompt();
  };

  useEffect(() => {
    // if script already loaded by the time we mount
    initGsi();
  }, []);

  return (
    <>
      {/* Ensure the GSI script is loaded once and then init */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initGsi}
      />

      {openAccountSetup ? (
        <AccountSetup
          email={email}
          username={username}
          accountSetupCallback={() => router.push('/requests')}
          // This looks like a Facebook endpoint; confirm you want this for Google signups
          url={`${configData.SERVER_URL}/login/facebook/first-time`}
          successfunc={(res) => {
            localStorage.setItem('token', res.data.token);
          }}
        />
      ) : (
        <div>
          {/* Google renders into this div */}
          <div ref={gsiDivRef} />
        </div>
      )}
    </>
  );
}
