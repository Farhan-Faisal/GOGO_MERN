import React from "react";

import styles from "../styles/common_styles.module.css";
import configData from "../config.json";
import { FaFilter } from "@react-icons/all-files/fa/FaFilter"; // npm install @react-icons/all-files --save
import { EventTagsPopup } from "./EventsTags";

const EventsFilter = ({
  selectedTags, setSelectedTags, 
  popupTrigger, setPopupTrigger, getEventsList}) => {

  const deleteFilterOnClick = (e, updatedFilters) => {
    localStorage.setItem("tags", JSON.stringify(updatedFilters));
    getEventsList(false); // Reloads List of events
    setSelectedTags(updatedFilters); // Reloads displayed filters
  }

  const selectedFiltersUI = selectedTags.map((currfilter, filterIndex) => {
    return (
      <div className={styles.smallPurpleButton} key={filterIndex}
        onClick={(e) => deleteFilterOnClick(e, selectedTags.filter(tag => tag !== currfilter))}
      >
        {currfilter}
      </div>
    );
  });

  return(
    <> 
      <div className={styles.smallPurpleButton} onClick={() => setPopupTrigger(true)}> 
        <FaFilter/> 
      </div>
    
      {selectedFiltersUI} 

      <EventTagsPopup 
        popupTrigger={popupTrigger} setPopupTrigger={getEventsList} // Slightly hacky
        selectedTags={selectedTags} setSelectedTags={setSelectedTags}
        saveTags={tags => localStorage.setItem("tags", JSON.stringify(tags))} //DEV-CGP-23
      />
    </>
  )
}

export default EventsFilter;