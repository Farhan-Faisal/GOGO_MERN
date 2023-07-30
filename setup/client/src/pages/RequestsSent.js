import styles from "../styles/common_styles.module.css";
import requestSentStyles from "../styles/RequestsSent.module.css";

function RequestsSent() {
  const requestSent = [];
  return (
    <div className={styles.rightContainer}>
      <div className={styles.horizontalContent}>
        <div className={styles.squishHeading}>Requests Sent</div>
      </div>
      <ul className={requestSentStyles.unorderedList}>
        {[...Array(10)].map((e, i) => (
          <li className={requestSentStyles.requestSentCard}>
            <div className={requestSentStyles.eventPhoto}>
              <p>Photo</p>
            </div>
            <div className={requestSentStyles.requestSentCardContent}>
              <h4>
                <b>Event Name</b>
              </h4>
              <p>Event Date</p>
              <p>Location</p>
              <p>When</p>
            </div>
            <div className={requestSentStyles.requestCardStatus}>
              Request Status
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestsSent;
