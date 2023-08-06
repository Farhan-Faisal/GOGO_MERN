import eventStyles from "../styles/event.module.css";
import styles from "../styles/common_styles.module.css";
import configData from "../config.json";
const EventItem = ({ event }) => {
  console.log("Event item" + event.image);
  return (
    <>
      <div
        className={eventStyles.eventDetails}
      >
        {/* For CGP-12 */}
        <div className={eventStyles.eventPhotoContainer}>
        <img
            src={configData.SERVER_URL + "/uploads/" + event.image}
            alt="No photo"
            className={eventStyles.eventPhoto}
        />
        </div>
        <div className={styles.verticalContent}>
          <h1 className={styles.boldtext}>{event.title}</h1>
          <p className={styles.smalltext}>{event.date}</p>
          <p className={styles.smalltext}>{event.location}</p>
          <p className={styles.smalltext}>from ${event.price}</p>
          {event.onMe === true &&
              <p className={eventStyles.eventOnMe}>{"\u2705"} ON ME</p>
          }
        </div>
      </div>
    </>
  );
};

export default EventItem;
