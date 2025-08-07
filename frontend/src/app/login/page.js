'use client';

import LoginForm from './loginForm';
import AuthLayout from '../../layout/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout>
        <LoginForm
          loggedInCallBack="/dashboard"
          businessLoggedInCallBack={() => {}}
          SignUpRedirect="/signup"
        />
    </AuthLayout>
  );
}
