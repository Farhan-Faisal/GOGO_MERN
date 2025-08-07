'use client'; // Required if you're using the App Router (`app/` directory)

import React from 'react';
import styles from '../styles/common_styles.module.css';

export default function StatelessPopup({ trigger, setTrigger, children }) {
  if (!trigger) return null;

  return (
    <div className={styles.popupbg}>
      <div className={styles.popup}>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: '0',
            width: 'min-content',
          }}
        >
          <button
            onClick={() => setTrigger(false)}
            className={styles.smallTransparentButton}
          >
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
