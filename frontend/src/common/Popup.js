'use client'; // Needed if you're using this in the `app/` directory

import React, { useState } from 'react';
import styles from '../styles/common_styles.module.css';

export default function Popup({ content, popupState, children, popupStyle }) {
  const [isOpen, setIsOpen] = useState(popupState === true);

  const c = content(() => setIsOpen(false)); // content is a function that takes a close handler

  return (
    <>
      {isOpen && (
        <div className={styles.popupbg}>
          <div className={popupStyle === 'old' ? styles.popup_old : styles.popup}>
            <div
              style={{
                marginLeft: 'auto',
                marginRight: '0',
                width: 'min-content',
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className={styles.smallTransparentButton}
              >
                x
              </button>
            </div>
            {c}
          </div>
        </div>
      )}
      <div style={{ cursor: 'pointer' }} onClick={() => setIsOpen(true)}>
        {children}
      </div>
    </>
  );
}
