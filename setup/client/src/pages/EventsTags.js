import styles from "../styles/common_styles.module.css";
import ceStyles from "./CreateEvents.module.css";
import StatelessPopup from "../CommonItems/StatelessPopup";

const EventTagsPopup = ({ popupTrigger, setPopupTrigger, selectedTags, setSelectedTags, saveTags}) => {

    // https://docs.developer.yelp.com/docs/resources-event-categories
    const tagsMasterlist = [ 
      "Music", "Visual Arts", "Performing Arts", "Film", "Lectures", "Books", "Fashion", "Food & Drink", 
      "Festivals", "Charities", "Active Life", "Nightlife", "Kids & Family", "Sports", "Other"
    ];

    // User can add a max of 3 tags to an event
    const toggleTag = (tag) => { 
      console.log(`toggling ${tag}`);
      if (selectedTags.includes(tag) === true) {
          setSelectedTags(prevList => prevList.filter(i => i !== tag));
      } else {
        if (selectedTags.length < 3)
          setSelectedTags(prevList => [...prevList, tag]);
      }
    } 

    const tagsMasterlistUI = tagsMasterlist.map((tag, tagIndex) => {
        return (
          <div className={
                  (selectedTags.includes(tag) === true) 
                  ? styles.smallPurpleButton 
                  : styles.smallTransparentButton
              }
              onClick={()=> toggleTag(tag)} key={tagIndex}
          >
            {tag}
          </div>
        );
      }
    );

    const saveChanges = () => {

    if (saveTags !== undefined) saveTags(selectedTags); // DEV-CGP-23: generalising event tags feature for reuse
      setPopupTrigger(false);
    }

    return(
      <StatelessPopup trigger={popupTrigger} setTrigger={setPopupTrigger}>
        <div style={{width: "800px"}}>
        <div className={styles.wrapContainer}>{tagsMasterlistUI}</div>
        </div>
        <div style={{ marginRight: "10px", marginLeft: "auto", width: "fit-content" }} >
            <button className={styles.transparentButton} onClick={saveChanges}>
              Save Tags
            </button>
        </div>
      </StatelessPopup>
    );
};

const EventTags = ({selectedTags, setSelectedTags, popupTrigger, setPopupTrigger, saveTags}) => {
  const eventTagsUI = selectedTags.map((tag, tagIndex) => {
      return (
        <div className={styles.smallPurpleButton} key={tagIndex}>
          {tag}
        </div>
      );
    }
  );

  return(
    <>
      <div className={ceStyles.eventTagsContainer}>
        <button type="button" className={styles.smallPurpleButton} onClick={() => setPopupTrigger(true)}>
          {'\u270E'}
        </button>
        {eventTagsUI}
      </div>

      <EventTagsPopup 
        popupTrigger={popupTrigger} setPopupTrigger={setPopupTrigger}
        selectedTags={selectedTags} setSelectedTags={setSelectedTags}
        saveTags={saveTags}
      />
    </>
  );
};

export {
  EventTags,
  EventTagsPopup,
}
