'use client'; // Required for App Router (Next.js 13+)

import { useState } from 'react';
import SignupForm from './SignupForm';
import AccountSetup from './AccountSetup';
import AuthLayout from '../../layout/AuthLayout';

export default function SignupHub({ accountSetupCallback }) {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  return (
    <AuthLayout>
      {!signedIn ? (
          <SignupForm
            loggedInCallBack="/dashboard"
            businessLoggedInCallBack={() => {}}
            SignUpRedirect="/signup"
          />
    ) : (
        <AccountSetup
          accountSetupCallback={accountSetupCallback}
          email={email}
          username={username}
        />
      )}
    </AuthLayout>
  );
}
