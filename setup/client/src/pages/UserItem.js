import eventStyles from "../styles/event.module.css";
import styles from "../styles/common_styles.module.css";
import configData from "../config.json";

const UserItem = ({ username, image }) => {
  return (
    <>
      <div
        className={eventStyles.eventDetails}
      >
        {/* For CGP-12 */}
        <div className={eventStyles.eventPhotoContainer}>
        <img
            src={configData.SERVER_URL + "/uploads/" + image}
            alt="No photo"
            className={eventStyles.eventPhoto}
        />
        </div>
        <div className={styles.verticalContent}>
          <h1 className={styles.boldtext}>{username}</h1>
        </div>
      </div>
    </>
  );
};

export default UserItem;
