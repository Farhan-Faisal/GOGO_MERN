import eventStyles from "../styles/event.module.css";
import styles from "../styles/common_styles.module.css";
import configData from "../config.json";

const UserItem = ({ user }) => {
  return (
    <>
      <div className={eventStyles.eventDetails} style={{display: "flex", alignItems: "center"}}>
        {/* For CGP-12 */}
        <div className={eventStyles.eventPhotoContainer} style={{margin: "10px"}}>
          <img
              src={configData.SERVER_URL + "/uploads/" + user.image}
              alt="No photo"
              className={eventStyles.eventPhoto}
          />
        </div>
        <div className={styles.verticalContent}>
          <h1 className={styles.boldtext}>{user.username}</h1>
        </div>
      </div>
    </>
  );
};

export default UserItem;
