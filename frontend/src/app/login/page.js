'use client';

import LoginForm from './loginForm';
import styles from './loginPage.module.css'; // CSS module for styling

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.leftColumn}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>GOGO</h1>
          <p className={styles.description}>Secure chat platform to connect with friends.</p>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <LoginForm
          loggedInCallBack="/dashboard"
          businessLoggedInCallBack={() => {}}
          SignUpRedirect="/signup"
        />
      </div>
    </div>
  );
}
