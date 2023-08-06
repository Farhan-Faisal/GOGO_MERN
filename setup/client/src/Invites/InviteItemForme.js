import requestStyles from "../styles/requests.module.css";
import styles from "../styles/common_styles.module.css";
import { useEffect, useState, useReducer } from "react";
import inviteStyles from "../styles/invite.module.css";
import requestSentStyles from "../styles/RequestsSent.module.css";
import eventStyles from "../styles/event.module.css";
import Popup from "../CommonItems/Popup";
import jwt_decode from "jwt-decode";
import EventItem from "../pages/EventItem";

import Axios from "axios";

const InviteItemForMe = ({ _id, invitee, promoter, event, status, setInvite }) => {
  //TODO: DELETE REQUEST to delete the request
  //   const deleteRequest = () => {
  //     axios
  //       .delete("http://localhost:5000/requests/delete/" + _id)
  //       .then((res) => {
  //         setRequests((prev) => prev.filter((r) => r._id !== _id));
  //       })
  //       .catch((err) => console.log(err));
  //   };


  const rejectInvite = (reqId) => {
    try {
      console.log(reqId);

      Axios.patch("http://localhost:5000/promoter-invites/reject/" + reqId);
      setInvite(prev => prev.filter(r => r._id !== _id));

    } catch (e) {
      console.log(e);
    }
  };

  const acceptInvite = (reqId) => {
    try {
      // Get username and password
      const token = localStorage.getItem("token");
      const useremail = jwt_decode(token).userDetail.email;
      const username = jwt_decode(token).userDetail.username;

      // Post the chat room
      var participants = [useremail, promoter.email];
      participants.sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });

      Axios.post("http://localhost:5000/api/chats/", {
        participants: [useremail, promoter.email],
        participantsUsernames: [username, promoter.username],
        chatHistory: [],
        roomID: participants[0] + participants[1],
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      Axios.patch("http://localhost:5000/promoter-invites/accept/" + reqId);

      setInvite(prev => prev.filter(r => r._id !== _id));
    } catch (e) {
      console.log(e);
    }
  };


  function makeFirstLetterCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 
    return (
        <div className={inviteStyles.inviteCard} style={{ rightmargin: "100px" }}>
              <img
                src={`http://localhost:5000/uploads/` + event.image}
                alt="No photo"
                className={requestSentStyles.eventPhoto}
              />
              <div className={inviteStyles.inviteCardContent}>
                <h4>
                  <b>{event.title}</b>
                </h4>
                <p>{"From " + promoter.username}</p>
                <p>{makeFirstLetterCapital(promoter.gender)}</p>
                <p>{promoter.email}</p>
              </div>
              <div className={inviteStyles.requestButtons}>
                <button
                  className={inviteStyles.acceptButton}
                  onClick={() => {
                    acceptInvite(_id);
                  }}
                >
                  Accept
                </button>
                <button
                  className={inviteStyles.rejectButton}
                  onClick={() => {
                    rejectInvite(_id);
                  }}
                >
                  Reject
                </button>
              </div>
          </div>
    );


};

export default InviteItemForMe;
