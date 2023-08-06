import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import "./CreateEvents.css";

import configData from "../config.json";

import styles from "../styles/common_styles.module.css";
import ceStyles from "./CreateEvents.module.css";
import jwt_decode from "jwt-decode";
import StatelessPopup from "../CommonItems/StatelessPopup";

import { EventTags } from "./EventsTags";

function CreateEvents() {
  const token = jwt_decode(localStorage.getItem("token"));
  console.log(token);
  const creator = token.id;
  const creator_ref = token.isBusiness ? "business-details" : "user-details";
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [onMe, setOnMe] = useState(false);

  const [eventPic, setEventPic] = useState("");

  // DEV-CGP-9
  const [selectedTags, setSelectedTags] = useState(["Other"]);
  const [popupTrigger, setPopupTrigger] = useState(false);

  // DEV-CGP-22
  const [infoTrigger, setInfoTrigger] = useState(false);

  // const [createdUserEvents, setCreatedUserEvents] = useState([]);

  // didn't use any of this, but it can be revived if needed

  // useEffect(() => {
  //     console.log(decoded);
  //     Axios.get(configData.SERVER_URL + "/api/eventlink/" + decoded.userDetail.email)
  //         .then((response) => {
  //         if (response.length === 0) {
  //             setCreatedUserEvents([]);
  //         } else {
  //             setCreatedUserEvents(response.data[0].eventList);
  //         }
  //         })
  //         .catch((error) => {
  //             setCreatedUserEvents([]);
  //         });
  // }, []);

  // useEffect(() => {
  //     updateEvents();
  // }, [createdUserEvents]);

  // async function updateEvents() {
  //     console.log(createdUserEvents);
  //     await Axios.delete(configData.SERVER_URL + "/api/eventLink/" + decoded.userDetail.email).then(
  //         (response) => {
  //         console.log("Event link document deleted!");
  //     });
  //     await Axios.post(configData.SERVER_URL + "/api/eventLink", {
  //         email: decoded.userDetail.email,
  //         eventList: createdUserEvents,
  //     }).then(response => {
  //         console.log(response);
  //     });
  // }

  async function createUserEvent(e) {
    // create a unique ID for the event

    e.preventDefault();
    localStorage.setItem("tags", JSON.stringify([])); // DEV-CGP-9

    const newUUID = uuidv4(); //uuid();

    console.log(creator);
    const formData = new FormData();
    formData.append("eventID", newUUID);
    formData.append("creator", creator);
    formData.append("creator_ref", creator_ref);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("ticketLink", ticketLink);
    formData.append("onMe", onMe);
    formData.append("eventPic", eventPic);
    formData.append("tags", JSON.stringify(selectedTags));

    // post the event
    await Axios.post(configData.SERVER_URL + "/api/userevents", formData)
      .then(() => {
        alert("Event Created!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={ceStyles.createEventsPopup}>
      <div className={styles.horizontalContent}>
        <div className={styles.squishHeading}>Create Your Event</div>
      </div>

      <form onSubmit={(e) => createUserEvent(e)} encType="multipart/form-data">
        <div>
          <div className={styles.horizontalContent}>
            <div className={styles.verticalContent}>
              <div className={styles.division}>
                <p className={styles.text}>Give the event a name</p>
                <br />
              </div>
              <div className={styles.division}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="name"
                  onChange={(event) => setTitle(event.target.value)}
                ></input>
              </div>
            </div>
            <div className={styles.verticalContent}>
              <div className={styles.division}>
                <p className={styles.text}>When is your event?</p>
                <br />
              </div>
              <div className={styles.division}>
                <input
                  type="date"
                  className={styles.inputField}
                  placeholder="date"
                  onChange={(event) => setDate(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.horizontalContent}>
            <div className={styles.verticalContent}>
              <div className={styles.division}>
                <p className={styles.text}>Where will it be?</p>
                <br />
              </div>
              <div className={styles.division}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="location"
                  onChange={(event) => setLocation(event.target.value)}
                ></input>
              </div>
            </div>
            <div className={styles.verticalContent}>
              <div className={styles.division}>
                <p className={styles.text}>How much is a ticket?</p>
                <br />
              </div>
              <div className={styles.division}>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="price"
                  onChange={(event) => setPrice(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.horizontalContent}>
            <div className={styles.verticalContent}>
              <div className={styles.division}>
                <p className={styles.text}>Are tickets OnMe?</p>
                <button type="button" className={ceStyles.onMeInfo} onClick={() => setInfoTrigger(true)}>i</button>
                <StatelessPopup trigger={infoTrigger} setTrigger={setInfoTrigger}>
                  <div className={styles.text}>
                    Introducing the "OnMe" feature!
                  </div>
                  <br></br>
                  <div style={{color: "white", fontSize: "20px"}}>
                    This unique feature allows event creators to choose whether they will cover the cost of tickets
                    or make everyone foot the bill.
                    Let's be honest, who would say no to a sparkly free ticket? 🎟️✨
                  </div>
                </StatelessPopup>
                <br />
              </div>
              <div className={styles.division}>
                <input
                  type="radio"
                  name="OnMe"
                  value="true"
                  className="OnMeRadio"
                  onClick={() => setOnMe(true)}
                ></input>
                <p className={styles.text}>Yes</p>
                <input
                  type="radio"
                  name="OnMe"
                  value="false"
                  className="OnMeRadio"
                  onClick={() => setOnMe(false)}
                ></input>
                <p className={styles.text}>No</p>
              </div>
              {/* <input type='checkbox' className="EventBox" onChange={() => setOnMe(!onMe)}></input> */}
            </div>
            <div className={styles.verticalContent}>
              <div className={styles.division}>
                <p className={styles.text}>Where can you buy tickets?</p>
                <br />
              </div>
              <div className={styles.division}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="link"
                  onChange={(event) => setTicketLink(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.horizontalContent}>
            {/* Description */}
            <div className={styles.verticalContent}>
              <div className={styles.division}>
                <p className={styles.text}>Describe the event for others</p>
                <br />
              </div>
              <div className={styles.division}>
                <textarea
                  className={styles.inputField}
                  style={{ width: "500px" }}
                  placeholder="type of event, genre of music..."
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
            </div>

            {/* DEV-CGP-9 // tag */}
            <div className={styles.verticalContent}>
              <div
                className={styles.division}
                onClick={(e) => {
                  setPopupTrigger(true);
                }}
              >
                <p className={styles.text}>Event Tags</p>
                <br />
              </div>

              <div className={ceStyles.division}>
                <EventTags
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                  popupTrigger={popupTrigger}
                  setPopupTrigger={setPopupTrigger}
                  saveTags={setSelectedTags}
                />
              </div>
            </div>
          </div>

          {/* For CGP-12 // On its own so dont need HWContent*/}
          <div className={styles.division}>
            <div className={styles.verticalContent}>
              <p className={styles.text}>Add event picture</p>
              <br />
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="eventPic"
                onChange={(e) => {
                  setEventPic(e.target.files[0]);
                  console.log(e.target.files);
                }}
                style={{ color: "white" }}
              />
            </div>
          </div>
          <div className={styles.division}>
            <input
              type="submit"
              value="Create Event"
              className={styles.purpleButton}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateEvents;
