import { useEffect, useState } from "react";
import Popup from "../CommonItems/Popup";
import jwt_decode from "jwt-decode";
import EventItem from "../pages/EventItem";

import styles from "../styles/common_styles.module.css";
import requestSentStyles from "../styles/RequestsSent.module.css";
import requestStyles from "../styles/requests.module.css";
import configData from "../config.json";
import Axios from "axios";

const PromoterInvites = ({ event }) => {
  const token = jwt_decode(localStorage.getItem("token"));
  const loggedUserEmail = token.userDetail.email;
  const [userEmail, setUserEmail] = useState("");

  const Content = (close, e) => {
    const [requestData, setRequestData] = useState([]);

    const getRequestData = () => {
      Axios.get(
        configData.SERVER_URL + "/promoter-invites/event/" + event.event._id
      ).then((response) => {
        setRequestData(response.data);
        console.log(response.data);
      });
    };
    async function sendRequest(event) {
      if (userEmail === loggedUserEmail) {
        alert("This is your email!");
        return;
      }
      try {
        await Axios.post(configData.SERVER_URL + "/promoter-invites/", {
          promoterEmail: loggedUserEmail,
          inviteeEmail: userEmail,
          event: event._id,
        });
        getRequestData();
        alert("Request sent!");
      } catch (error) {
        alert("Email not found!");
      }
    }

    useEffect(() => {
      Axios.get(
        configData.SERVER_URL + "/promoter-invites/event/" + event.event._id
      ).then((response) => {
        setRequestData(response.data);
        console.log(response.data);
      });
    }, []);
    function makeFirstLetterCapital(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
      <>
        <div className={requestStyles.popupHeading}>
          Send Promoter Invites:{" "}
        </div>
        <input
          type="email"
          value={userEmail}
          placeholder="User Email"
          onChange={(e) => setUserEmail(e.target.value)}
          className={styles.inputField}
        />
        <button
          className={styles.smallPurpleButton}
          onClick={() => sendRequest(event.event)}
        >
          Send Request
        </button>
        <ul className={requestStyles.unorderedList}>
          {requestData.map((req) => (
            <li className={requestSentStyles.requestSentCard}>
              <img
                src={configData.SERVER_URL + "/uploads/" + req.invitee.image}
                alt="No photo"
                className={requestSentStyles.eventPhoto}
              />
              <div className={requestSentStyles.requestSentCardContent}>
                <h4>
                  <b>{req.invitee.username}</b>
                </h4>
                <p>{req.invitee.age}</p>
                <p>{makeFirstLetterCapital(req.invitee.gender)}</p>
                <p>{req.invitee.email}</p>
                {req.invitee.biography && <p>{req.invitee.biography}</p>}
              </div>
              <div className={requestSentStyles.requestCardStatus}>
                {makeFirstLetterCapital(req.status)}
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div key={event.event._id} style={{ margin: "10px" }}>
      <Popup content={(c) => Content(event.event, c)} popupStyle = "old">
        <EventItem event={event.event} />
      </Popup>
    </div>
  );
};

export default PromoterInvites;
