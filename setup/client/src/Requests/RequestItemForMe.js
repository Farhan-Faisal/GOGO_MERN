import requestStyles from "../styles/requests.module.css";
import styles from "../styles/common_styles.module.css";
import { useEffect, useState, useReducer } from "react";
import requestSentStyles from "../styles/RequestsSent.module.css";
import eventStyles from "../styles/event.module.css";
import Popup from "../CommonItems/Popup";
import jwt_decode from "jwt-decode";
import EventItem from "../pages/EventItem";

import Axios from "axios";

const RequestItemForMe = ({ event }) => {
  //TODO: DELETE REQUEST to delete the request
  //   const deleteRequest = () => {
  //     axios
  //       .delete("http://localhost:5000/requests/delete/" + _id)
  //       .then((res) => {
  //         setRequests((prev) => prev.filter((r) => r._id !== _id));
  //       })
  //       .catch((err) => console.log(err));
  //   };
  const [requestData, setRequestData] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  async function fetchRequest() {
    try {
      const res = await Axios.get(
        "http://localhost:5000/requests/pending/" + event._id
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchRequest().then((data) => {
      setRequestData(data);
      console.log(requestData);
    });
  }, []);

  const rejectRequest = (reqId) => {
    try {
      console.log(reqId);
      const reqIndex = requestData.findIndex(({ _id }) => _id === reqId);

      Axios.patch("http://localhost:5000/requests/reject/" + reqId);

      if (reqIndex !== -1) {
        setRequestData([
          ...requestData.slice(0, reqIndex),
          ...requestData.slice(reqIndex + 1),
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const acceptRequest = (reqId) => {
    try {
      // Get username and password
      const token = localStorage.getItem("token");
      const useremail = jwt_decode(token).userDetail.email;
      const username = jwt_decode(token).userDetail.username;
      const reqIndex = requestData.findIndex(({ _id }) => _id === reqId);

      // Post the chat room
      var participants = [useremail, requestData[0].requester.email];
      participants.sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });

      Axios.post("http://localhost:5000/api/chats/", {
        participants: [useremail, requestData[0].requester.email],
        participantsUsernames: [username, requestData[0].requester.username],
        chatHistory: [],
        roomID: participants[0] + participants[1],
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      Axios.patch("http://localhost:5000/requests/accept/" + reqId);

      if (reqIndex !== -1) {
        alert("Accepted Request from " + requestData[0].requester.username);
        setRequestData([
          ...requestData.slice(0, reqIndex),
          ...requestData.slice(reqIndex + 1),
        ]);
      }
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
        <div className={requestStyles.popupHeading}>Requests: </div>
        <ul className={requestStyles.unorderedList}>
          {requestData.map((req) => (
            <li className={requestSentStyles.requestSentCard}>
              <img
                src={`http://localhost:5000/uploads/` + req.requester.image}
                alt="No photo"
                className={requestSentStyles.eventPhoto}
              />
              <div className={requestSentStyles.requestSentCardContent}>
                <h4>
                  <b>{req.requester.username}</b>
                </h4>
                <p>{req.requester.age}</p>
                <p>{makeFirstLetterCapital(req.requester.gender)}</p>
                <p>{req.requester.email}</p>
                {req.requester.biography && <p>{req.requester.biography}</p>}
              </div>
              <div className={requestSentStyles.requestButtons}>
                <button
                  className={requestSentStyles.acceptButton}
                  onClick={() => {
                    acceptRequest(req._id);
                  }}
                >
                  Accept
                </button>
                <button
                  className={requestSentStyles.rejectButton}
                  onClick={() => {
                    rejectRequest(req._id);
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
    <div key={event._id} style={{ margin: "10px" }}>
      <Popup content={(c) => onClick(event, c)} popupStyle = "old">
        <EventItem event={event} />
      </Popup>
    </div>
  );
};

export default RequestItemForMe;
