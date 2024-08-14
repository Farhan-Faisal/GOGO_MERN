import eventStyles from "../../styles/event.module.css";
import styles from "../../styles/common_styles.module.css";
import configData from "../../config.json";

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
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", color: "white"}}>
          <h1 className={styles.boldtext} >{user.username}</h1>
          <ul style={{display: "flex", flexDirection: "column", alignItems: "left", color: "white"}}>
            <li><b>Age: </b><span>{user.age}</span></li>
            <li><b>Gender: </b><span>{user.gender}</span></li>
            <li><b>Email: </b><span>{user.email}</span></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserItem;
