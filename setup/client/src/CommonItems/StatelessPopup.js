import styles from "../styles/common_styles.module.css";

const StatelessPopup = ({ trigger, setTrigger, children }) => {
  return trigger ? (
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
            onClick={() => setTrigger(false)}
            className={styles.smallTransparentButton}
          >
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default StatelessPopup;
