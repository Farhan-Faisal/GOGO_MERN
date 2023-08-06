import jwtDecode from "jwt-decode";
import { useEffect, useState, useReducer } from "react";
import PromoterRequestForMe from "../Requests/PromoterRequestForMe";
import PromoterEvents from "../Requests/PromoterEvents";

import Axios from "axios";

import styles from "../styles/common_styles.module.css";

function Promoter() {
  const token = jwtDecode(localStorage.getItem("token"));
  console.log(token);

  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [requestToggle, setRequestToggle] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // useEffect(() => {
  //   Axios.get("http://localhost:5000/requests/for/" + token.id)
  //     .then((res) => {
  //       console.log(res.data);
  //       setForMeRequests(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const changeRequestStatus = (request, status) => {
    var temp = [];
    requests
      .filter((r) => request._id !== r._id)
      .map((r) => {
        temp.push(r);
      });
    var copy = requests.slice();
    copy = copy.filter((r) => request._id === r._id)[0];
    copy.status = status;
    temp.push(copy);
    setRequests(temp);
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/promoter-requests/for/" + token.id)
      .then((res) => {
        setRequests(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    // Axios.get("http://localhost:5000/promoter-requests/pending/for/" + token.id)
    // .then((res) => {
    //     setRequests(res.data);
    //     console.log(res.data);
    // })
    // .catch((err) => console.log(err));
    // Axios.get("http://localhost:5000/promoter-requests/accepted/for/" + token.id)
    // .then((res) => {
    //     setRequests(...requests, res.data);
    //     console.log(res.data);
    // })
    // .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.rightContainer}>
      <div className={styles.squishHeading}>PROMOTER REQUESTS</div>
      <div className={styles.wrapContainer}>
        <div className={styles.horizontalContent}>
          <div style={{ flex: "1" }}>
            <button
              className={styles.smallTransparentButton}
              onClick={() => setRequestToggle(false)}
              disabled={!requestToggle}
            >
              Incoming Requests
            </button>
          </div>

          <div style={{ flex: "1" }}>
            <button
              className={styles.smallTransparentButton}
              onClick={() => setRequestToggle(true)}
              disabled={requestToggle}
            >
              Events I'm Promoting
            </button>
          </div>
        </div>
      </div>
      {requestToggle ? (
        <div className={styles.wrapContainer}>
          {requests
            .filter((request) => request.status === "accepted")
            .map((request) => (
              <PromoterEvents event={request} />
            ))}{" "}
        </div>
      ) : (
        <div className={styles.wrapContainer}>
          {requests
            .filter((request) => request.status === "pending")
            .map((request) => (
              <PromoterRequestForMe
                event={request}
                changeRequestStatusCallback={changeRequestStatus}
              />
            ))}{" "}
        </div>
      )}
    </div>
  );
}

export default Promoter;
