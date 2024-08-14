import { useEffect, useState } from "react";

import styles from "../styles/common_styles.module.css";
import eventStyles from "../styles/event.module.css";

import configData from "../config.json";

import Dropzone from "react-dropzone";

import { EventTags, EventTagsPopup } from "./EventsTags";
import axios from "axios";
import StatelessPopup from "../CommonItems/StatelessPopup";

const EventPopupContent = ({ userid, event, index, setEvent, close }) => {
  const [tags, setTags] = useState([]);
  const [t, setT] = useState(false);

  const [processed, setProcessed] = useState(true);
  const [processedMessage, setProcessedMessage] = useState("");

  const makeRequest = () => {
    axios.post(configData.SERVER_URL + "/requests/", {
      requester: userid,
      event: event._id,
    }).then(res => {
      setProcessed(true);
      setProcessedMessage(res.data.msg);

      // Update numRequests for specific event in db only if the request does not already exist
      if (!res.data.exists){
        axios.post(configData.SERVER_URL + "/api/userevents/numRequests", {
        _id: event._id,
        numRequests: event.numRequests + 1,
        }).then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div>
      <EventTagsPopup
        popupTrigger={t} setPopupTrigger={setT} selectedTags={tags}
        setSelectedTags={setTags} saveTags={setTags}
      />
      {userid !== event.creator._id ? (
        <div style={{ width: "min-content", marginLeft: "auto", marginRight: "0px",}} >
      
          <div style={{ width: "min-content", marginLeft: "auto", marginRight: "0px", }} >
            
              <button className={styles.smallPurpleButton} onClick={makeRequest} >
                make a request
              </button>
          </div>
        </div>) :""};
      </div>
  );
};

export default EventPopupContent;
