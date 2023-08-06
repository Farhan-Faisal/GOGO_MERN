import { useEffect, useState } from "react";

import styles from "../styles/common_styles.module.css";
import eventStyles from "../styles/event.module.css";

import Dropzone from "react-dropzone";

import { EventTags, EventTagsPopup } from "./EventsTags";
import axios from "axios";
import StatelessPopup from "../CommonItems/StatelessPopup";

const EventPopupContent = ({ userid, event, index, setEvent, close }) => {
  const [editing, setEditing] = useState(false);
  const [imagesrc, setImagesrc] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState("");
  const [onMe, setOnMe] = useState(false);
  const [editPic, setEditPic] = useState(null);
  const [t, setT] = useState(false);

  // https://docs.developer.yelp.com/docs/resources-event-categories
  const tagsMasterlist = [
    "Music",
    "Visual Arts",
    "Performing Arts",
    "Film",
    "Lectures",
    "Books",
    "Fashion",
    "Food & Drink",
    "Festivals",
    "Charities",
    "Active Life",
    "Nightlife",
    "Kids & Family",
    "Sports",
    "Other",
  ];

  useEffect(() => {
    setImagesrc(`http://localhost:5000/uploads/` + event.image);
    setTitle(event.title);
    setDate(event.date);
    setLocation(event.location);
    setPrice(event.price);
    setDescription(event.description);
    setTags(event.tags);
    setLink(event.ticketLink);
    if (editing === true) setEditPic(null);
    setOnMe(event.onMe);
    setT(false);
  }, [event, editing]);

  const staticContent = (
    <div style={{ width: "780px", flexDirection: "row" }}>
      <img
        src={`http://localhost:5000/uploads/` + event.image}
        alt="No photo"
        className={eventStyles.expandedPhoto}
      />
      <div style={{ height: "400px", overflowY: "auto" }}>
        <div className={styles.boldtext}>{event.title}</div>
        <div className={styles.smalltext}>
          {event.creator_ref === "user-details"
            ? event.creator.username
            : event.creator.businessName}
          <div style={{ color: "gray" }}>{event.creator.email}</div>
        </div>
        <div className={styles.smalltext}>Date: {event.date}</div>
        <div className={styles.smalltext}>Location: {event.location}</div>
        <div className={styles.smalltext}>Price: ${event.price}</div>
        {event.onMe === true && (
          <p className={eventStyles.eventOnMe}>{"\u2705"} ON ME</p>
        )}
        <div className={styles.wrapContainer}>
          <div style={{ fontSize: "20px", color: "white" }}>
            {event.description}
          </div>
        </div>
        <div className={styles.wrapContainer}>
          {event.tags.map(t => (
            <div className={styles.smallPurpleButton}>{t}</div>
          ))}
        </div>
        <div className={styles.smallTransparentButton}>{event.ticketLink}</div>
      </div>
    </div>
  );

  const onDrop = acceptedFiles => {
    if (acceptedFiles[0] !== null) {
      setEditPic(acceptedFiles[0]);
      console.log(acceptedFiles[0]);

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (acceptedFiles[0].name.match(/\.(jpeg|jpg|png)$/))
          setImagesrc(fileReader.result);
      };
      fileReader.readAsDataURL(acceptedFiles[0]);
    }
  };

  const editingContent = (
    <div style={{ width: "780px", height: "500px", overflowY: "auto" }}>
      <div className={styles.division}>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <img
                  src={imagesrc}
                  alt="No photo"
                  className={eventStyles.expandedPhoto}
                />
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div className={styles.division}>
        <div className={styles.text}>Title: </div>
        <input
          type="text"
          className={styles.inputField}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.division}>
        <div className={styles.text}>Date: </div>
        <input
          type="date"
          className={styles.inputField}
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      <div className={styles.division}>
        <div className={styles.text}>Location: </div>
        <input
          type="text"
          className={styles.inputField}
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <div className={styles.division}>
        <div className={styles.text}>Price: </div>
        <input
          type="number"
          className={styles.inputField}
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>
      <div className={styles.division}>
        <div className={styles.text}>Ticket Link: </div>
        <input
          type="text"
          className={styles.inputField}
          value={link}
          onChange={e => setLink(e.target.value)}
        />
      </div>
      <div className={styles.division}>
        <div className={styles.text}>On Me: </div>
        <div style={{ cursor: "pointer" }}>
          <div className={styles.text} onClick={() => setOnMe(!onMe)}>
            {onMe ? "✅" : "◼️"}
          </div>
        </div>
      </div>

      <div className={styles.division}>
        <div className={styles.text}>Description: </div>
        <textarea
          className={styles.inputField}
          style={{ width: "500px" }}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div
        className={styles.division}
        onClick={e => {
          setT(true);
        }}
      >
        <p className={styles.text}>Event Tags:</p>
        <div className={styles.smallPurpleButton} onClick={() => setT(true)}>
          {"\u270E"}
        </div>
        {tags.map(t => (
          <div className={styles.smallPurpleButton}>{t}</div>
        ))}
      </div>
    </div>
  );

  const onSave = e => {
    e.preventDefault();
    console.log(editPic);

    axios
      .post("http://localhost:5000/api/edit-content/" + event._id, {
        title,
        date,
        location,
        price,
        link,
        onMe,
        description,
        tags,
      })
      .then(res => {
        setEvent(res.data, index);
      });

    if (editPic !== null) {
      const formData = new FormData();
      formData.append("eventPic", editPic);
      axios
        .post("http://localhost:5000/api/image/" + event._id, formData)
        .then(res => {
          setEvent(res.data, index);
        });
    }

    close();
  };

  const [processed, setProcessed] = useState(false);
  const [processedMessage, setProcessedMessage] = useState("");

  const makeRequest = () => {
    axios.post("http://localhost:5000/requests/", {
      requester: userid,
      event: event._id,
    }).then(res => {
      setProcessed(true);
      setProcessedMessage(res.data.msg);

      // Update numRequests for specific event in db only if the request does not already exist
      if (!res.data.exists){
        axios.post("http://localhost:5000/api/userevents/numRequests", {
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
        popupTrigger={t}
        setPopupTrigger={setT}
        selectedTags={tags}
        setSelectedTags={setTags}
        saveTags={setTags}
      />
      {editing ? editingContent : staticContent}
      {userid === event.creator._id ? (
        <div
          style={{
            width: "min-content",
            marginLeft: "auto",
            marginRight: "0px",
          }}
        >
          {editing ? (
            <div style={{ flexDirection: "row", display: "flex" }}>
              <button className={styles.smallPurpleButton} onClick={onSave}>
                Save
              </button>
              <button
                className={styles.smallPurpleButton}
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className={styles.smallPurpleButton}
              onClick={() => setEditing(true)}
            >
              edit
            </button>
          )}
        </div>
      ) : (
        <div
          style={{
            width: "min-content",
            marginLeft: "auto",
            marginRight: "0px",
          }}
        >
          {processed ? (<div className={styles.text}>{processedMessage}</div>) :
          (
          <button
            className={styles.smallPurpleButton}
            onClick={makeRequest}
          >
            make a request
          </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventPopupContent;
