import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import EventItem from "./EventItem";

import configData from "../config.json";

import jwtDecode from "jwt-decode";

import EventsFilter from "./EventsFilter";
import EventPopupContent from "./EventPopupContent";
import StatelessPopup from "../CommonItems/StatelessPopup";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  // DEV-CGP-9
  const [selectedTags, setSelectedTags] = useState([]);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [token, setToken] = useState({});


  // DEV-CGP-6
  useEffect(() => {
    if (window.location.href.includes('facebook')) {

      const userEmail = window.location.href.split('=')[1];
      Axios.get(configData.SERVER_URL + "/login/token/" + userEmail)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setToken(jwtDecode(res.data.token))
          console.log("token in dashboard")
        });
    }
    else {
      setToken(jwtDecode(localStorage.getItem("token")));;
    }
  }, []);

  useEffect(() => {
    /* Get event tags from local storage if any */
    const localTags = localStorage.getItem("tags");
    if (localTags !== null) setSelectedTags(JSON.parse(localTags));

    getEventsList(false); // Get events list accounting for query tags
  }, []);

  const getEventsList = placeHolder => {
    const localTags = localStorage.getItem("tags");

    if (localTags !== null && JSON.parse(localTags).length !== 0) {
      // Gets events according to query tags
      Axios.post(configData.SERVER_URL + "/api/tags/userevents/", {
        queryTags: JSON.parse(localTags),
      }).then(response => {
        setEvents(response.data);
        console.log(response.data);
      });
    } else {
      Axios.get(configData.SERVER_URL + "/api/userevents").then(response => {
        setEvents(response.data);
        console.log(response.data);
      });
    }
    setPopupTrigger(placeHolder); // Closes the popup
  };

  //DEV-CGP-23: refactoring popup into a single component instead of separate popups for each event
  const [eventSelected, setEventSelected] = useState([]);
  const [eventExpand, setEventExpand] = useState(false);

  const openPopup = (event, index) => {
    setEventSelected([event, index]);
    setEventExpand(true);
  };

  const PopularEvents = () => {
    const getNumRequests = (event) => event.numRequests;

    const popularEventsList = [];

    events.forEach((event) => {
      if (popularEventsList.length < 6) {
        popularEventsList.push(event);
      } else {
        const mostPopularEvent = popularEventsList.reduce((min, current) => (getNumRequests(min) < getNumRequests(current) ? min : current));
        if (getNumRequests(event) > getNumRequests(mostPopularEvent)) {
          popularEventsList.splice(popularEventsList.indexOf(mostPopularEvent), 1, event);
        }
      }
    });

    popularEventsList.sort((event1, event2) => event2.numRequests - event1.numRequests);
    const remainingEvents = events.filter(event => !popularEventsList.includes(event));

    return (
      <>
        <div className={styles.wrapContainer}>
          {popularEventsList &&
            popularEventsList.map((event, index) => (
              <div
                key={event._id}
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => openPopup(event, index)}
              >
                <EventItem event={event} />
              </div>
            ))
          }
        </div>
        {
          selectedTags.length === 0 && (
            <hr style={{ borderTop: "3px solid white", marginLeft: "8px", marginRight: "100px" }}></hr>
          )
        }
        <div className={styles.wrapContainer}>
          {remainingEvents &&
            remainingEvents.map((event, index) => (
              <div
                key={event._id}
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => openPopup(event, index)}
              >
                <EventItem event={event} />
              </div>
            ))
          }
        </div>
      </>
    );
  };

  return (
    <>
      <StatelessPopup trigger={eventExpand} setTrigger={setEventExpand}>
        <EventPopupContent
          userid={token.id}
          event={eventSelected[0]}
          index={eventSelected[1]}
          setEvent={(e, i) => {
            setEvents(prevEvents => {
              prevEvents[i] = e;
              return prevEvents;
            });
            console.log({ e, events });
          }}
          close={() => setEventExpand(false)}
        />
      </StatelessPopup>

      <div className={styles.rightContainer}>
        <div className={styles.horizontalContent}>
          <div className={styles.squishHeading}>EVENTS</div>

          <div className={styles.smallDivision}>
            <div className={styles.verticalContent}>
              <input
                type="text"
                placeholder="Search"
                className={styles.inputMin}
              ></input>

              <Link to="/create-events">
                <button className={styles.purpleButton}>+ Create</button>
              </Link>
            </div>
          </div>
        </div>

        {/* DEV-CGP-9 */}
        <div className={styles.Division}>
          <div className={styles.horizontalContent} style={{ marginLeft: 10 }}>
            <EventsFilter
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              getEventsList={getEventsList}
              popupTrigger={popupTrigger}
              setPopupTrigger={getEventsList}
            />
          </div>
        </div>


        {
          selectedTags.length === 0 && (
            <div className={styles.Division}>
              <div className={styles.horizontalContent} style={{ marginLeft: 10 }}>
                <div className={styles.whiteHeading}>Trending🔥</div>
              </div>
            </div>
          )
        }

        <PopularEvents />
        <div className={styles.wrapContainer}>
          {
            // DEV-CGP-9
            selectedTags.length !== 0 && events.length === 0 && (
              <div className={styles.largeMessage}>
                No Events Found matching those filters!
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Dashboard;
