import requestStyles from "../styles/requests.module.css";
import { useEffect, useState, useReducer } from "react";
import requestSentStyles from "../styles/RequestsSent.module.css";
import Popup from "../CommonItems/Popup";
import jwt_decode from "jwt-decode";
import EventItem from "../pages/EventItem";

import Axios from "axios";

const PromoterRequestForMe = ({ event, changeRequestStatusCallback }) => {
  //TODO: DELETE REQUEST to delete the request
  //   const deleteRequest = () => {
  //     axios
  //       .delete("http://localhost:5000/requests/delete/" + _id)
  //       .then((res) => {
  //         setRequests((prev) => prev.filter((r) => r._id !== _id));
  //       })
  //       .catch((err) => console.log(err));
  //   };
  const [eventData, setEventData] = useState([event]);

  const rejectRequest = () => {
    try {
      Axios.patch(
        "http://localhost:5000/promoter-requests/reject/" + event._id
      );
      changeRequestStatusCallback(event, "rejected");
    } catch (e) {
      console.log(e);
    }
  };

  const acceptRequest = () => {
    try {
      // Get username and password

      //   // Post the chat room
      //   var participants = [useremail, requestData[0].requester.email];
      //   participants.sort(function (a, b) {
      //     if (a < b) return -1;
      //     if (a > b) return 1;
      //     return 0;
      //   });

      //   Axios.post("http://localhost:5000/api/chats/", {
      //     participants: [useremail, requestData[0].requester.email],
      //     participantsUsernames: [username, requestData[0].requester.username],
      //     chatHistory: [],
      //     roomID: participants[0] + participants[1],
      //   })
      //     .then((response) => {
      //       console.log(response);
      //     })
      //     .catch((err) => console.log(err));

      Axios.patch(
        "http://localhost:5000/promoter-requests/accept/" + event._id
      );
      alert("Accepted Request from " + event.event.creator.businessName);
      changeRequestStatusCallback(event, "accepted");
    } catch (e) {
      console.log(e);
    }
  };

  function makeFirstLetterCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function onClick(event, close) {
    console.log("Click " + close);
    return forMeRequestsCallback();
  }

  function forMeRequestsCallback() {
    return (
      <div>
        <div className={requestStyles.popupHeading}>
          Promoter request for this event created by:{" "}
        </div>
        <ul className={requestStyles.unorderedList}>
          {eventData.map(() => (
            <li className={requestSentStyles.requestSentCard}>
              <img
                src={`http://localhost:5000/uploads/` + event.event.creator.image}
                alt="No photo"
                className={requestSentStyles.eventPhoto}
              />
              <div className={requestSentStyles.requestSentCardContent}>
                <h4>
                  <b>{event.event.creator.businessName}</b>
                </h4>
                <p>{event.event.creator.email}</p>
                {event.event.creator.biography && (
                  <p>{event.event.creator.biography}</p>
                )}
              </div>
              <div className={requestSentStyles.requestButtons}>
                <button
                  className={requestSentStyles.acceptButton}
                  onClick={() => {
                    acceptRequest();
                  }}
                >
                  Accept
                </button>
                <button
                  className={requestSentStyles.rejectButton}
                  onClick={() => {
                    rejectRequest();
                  }}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div key={event.event._id} style={{ margin: "10px" }}>
      <Popup content={(c) => onClick(event.event, c)} popupStyle="old">
        <EventItem event={event.event} />
      </Popup>
    </div>
  );
};

export default PromoterRequestForMe;
