import { useState } from "react";
import styles from "../styles/common_styles.module.css";

const Popup = ({ content, popupState, children }) => {
  const [isOpen, setIsOpen] = useState(popupState === true);

  const c = content(() => setIsOpen(false));

  return (
    <>
      {isOpen ? (
        <div className={styles.popupbg}>
          <div className={styles.popup}>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "0",
                width: "min-content",
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
      ) : (
        ""
      )}
      <div style={{ cursor: "pointer" }} onClick={() => setIsOpen(true)}>
        {children}
      </div>
    </>
  );
};

export default Popup;
