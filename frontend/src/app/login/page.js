'use client';

import LoginForm from './loginForm';
import styles from './loginPage.module.css';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.leftColumn}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>GOGO</h1>
          <p className={styles.description}>Secure chat platform to connect with friends.</p>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.rightColumn}>
        {/* Duplicate overlay for mobile */}
        <div className={styles.overlayMobile}>
          <h1 className={styles.title}>GOGO</h1>
          <p className={styles.description}>Secure chat platform to connect with friends.</p>
        </div>

        <LoginForm
          loggedInCallBack="/dashboard"
          businessLoggedInCallBack={() => {}}
          SignUpRedirect="/signup"
        />
      </div>
    </div>
  );
}
