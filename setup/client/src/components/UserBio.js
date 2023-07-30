import { useState, useEffect } from "react";
import Axios from "axios";

import styles from "../styles/common_styles.module.css";

const UserBio = ({ useremail, url }) => {
  const maxChar = 200;
  let [aboutText, setAboutText] = useState("");
  let [editedText, setEditedText] = useState(aboutText);
  let [editAbout, setEditAbout] = useState(false);

  function onEditSaveButtonClick() {
    if (editAbout) {
      setAboutText(editedText);

      Axios.post(url, {
        useremail: useremail,
        biography: editedText,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      setEditAbout(false);
    } else {
      setEditAbout(true);
    }
  }

  useEffect(() => {
    Axios.get(url + useremail)
      .then((response) => {
        setAboutText(response.data.biography);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const EditOrAbout = () => {
    if (editAbout) {
      return (
        <textarea
          maxlength="200"
          className={styles.maxInputField}
          onChange={(e) => setEditedText(e.target.value)}
          defaultValue={aboutText}
        ></textarea>
      );
    } else {
      return <div className={styles.flexWrappableText}>{aboutText}</div>;
    }
  };
  return (
    <>
      <div className={styles.verticalContent}>
        {editAbout && (
          <div className={styles.horizontalContent}>
            <div className={styles.flexWrappableText}>Edit About</div>
            <button
              className={styles.smallPurpleButton}
              onClick={onEditSaveButtonClick}
            >
              Save
            </button>
            <button
              className={styles.smallPurpleButton}
              onClick={() => {
                setEditAbout(false);
                setEditedText(aboutText);
              }}
            >
              Cancel Edit
            </button>
          </div>
        )}
        <div className={styles.horizontalContent}>
          {EditOrAbout()}
          {!editAbout && (
            <button
              className={styles.smallTransparentButton}
              onClick={onEditSaveButtonClick}
            >
              🖉
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserBio;
