import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Axios from "axios";

import RequestItemForMe from "./RequestItemForMe";
import EventItem from "../pages/EventItem";
import ProfilePicture from "../components/ProfilePicture";
import Popup from "../CommonItems/Popup";

import styles from "../styles/common_styles.module.css";
import requestSentStyles from "../styles/RequestsSent.module.css";
import eventStyles from "../styles/event.module.css";
import requestStyles from "../styles/requests.module.css";

const PromoterRequestsPage = () => {
  const token = jwt_decode(localStorage.getItem("token"));
  const loggedUserEmail = token.businessDetail.email;
  const [myEvents, setMyEvents] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/api/myevent/" + token.id)
      .then((res) => {
        setMyEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Content = (close, event) => {
    const [requestData, setRequestData] = useState([]);

    const getRequestData = () => {
      Axios.get(
        "http://localhost:5000/promoter-requests/event/" + event._id
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
        await Axios.post("http://localhost:5000/promoter-requests/", {
          requesteeEmail: userEmail,
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
        "http://localhost:5000/promoter-requests/event/" + event._id
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
        <div className={requestStyles.popupHeading}>Promoter Requests: </div>
        <input
          type="email"
          value={userEmail}
          placeholder="User Email"
          onChange={(e) => setUserEmail(e.target.value)}
          className={styles.inputField}
        />
        <button
          className={styles.smallPurpleButton}
          onClick={() => sendRequest(event)}
        >
          Send Request
        </button>
        <div className={requestStyles.popupHeading2}>Promoters: </div>
        <ul className={requestStyles.unorderedList}>
          {requestData
            .filter((req) => req.status === "accepted")
            .map((req) => (
              <li className={requestSentStyles.requestSentCard}>
                <img
                  src={`http://localhost:5000/uploads/` + req.requestee.image}
                  alt="No photo"
                  className={requestSentStyles.eventPhoto}
                />
                <div className={requestSentStyles.requestSentCardContent}>
                  <h4>
                    <b>{req.requestee.username}</b>
                  </h4>
                  <p>{req.requestee.age}</p>
                  <p>{makeFirstLetterCapital(req.requestee.gender)}</p>
                  <p>{req.requestee.email}</p>
                </div>
                <div className={requestSentStyles.promoterAcceptedInvites}>
                  <text>Number of accepted invites:</text>
                  <p>1</p>
                </div>
              </li>
            ))}
        </ul>
        <div className={requestStyles.popupHeading2}>Pending Requests: </div>
        <ul className={requestStyles.unorderedList}>
          {requestData
            .filter((req) => req.status === "pending")
            .map((req) => (
              <li className={requestSentStyles.requestSentCard}>
                <img
                  src={`http://localhost:5000/uploads/` + req.requestee.image}
                  alt="No photo"
                  className={requestSentStyles.eventPhoto}
                />
                <div className={requestSentStyles.requestSentCardContent}>
                  <h4>
                    <b>{req.requestee.username}</b>
                  </h4>
                  <p>{req.requestee.age}</p>
                  <p>{makeFirstLetterCapital(req.requestee.gender)}</p>
                  <p>{req.requestee.email}</p>
                  {req.requestee.biography && <p>{req.requestee.biography}</p>}
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
    <div className={styles.rightContainer}>
      <div className={styles.squishHeading}>PROMOTER REQUESTS</div>
      <div className={styles.horizontalContent}></div>
      <div className={styles.wrapContainer}>
        {myEvents &&
          myEvents.map((event) => (
            <div key={event._id} style={{ margin: "10px" }}>
              <Popup content={(c) => Content(c, event)}>
                <EventItem event={event} />
              </Popup>
            </div>
          ))}
      </div>
    </div>
  );
};
export default PromoterRequestsPage;
