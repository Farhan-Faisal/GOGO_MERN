import { useEffect, useState} from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import chatRoomStyle from "./ChatRoom.module.css";
import configData from "../config.json";

const ChatRoomList = ({userEmail, roomID, setRoomID, getChatHistory, setBuddyUsername}) => {
    const [userRoomDocs, setUserRoomDocs] = useState([]);

    useEffect(() => {
        Axios.get(configData.SERVER_URL + "/api/chats/" + userEmail)
        .then((res) => { setUserRoomDocs(res.data); })
        .catch((res) => { console.log("Error retreiving user chat rooms"); })
    }, []);


    const roomClickHandler = (e, roomID, buddyUsername) => {
        getChatHistory(roomID)
        setRoomID(roomID);
        setBuddyUsername(buddyUsername);
    }

    const userRoomDocsUI = userRoomDocs.map((roomDocs, roomIndex) => {
        const userName = jwt_decode(localStorage.getItem("token")).userDetail.username
        const buddyUsername = roomDocs.participantsUsernames.filter(maybeBuddy => maybeBuddy.localeCompare(userName) !== 0)[0];

        const isSelected = roomID.localeCompare(roomDocs.roomID);

        return(
            <div 
                className={
                    (isSelected === 0) 
                    ? chatRoomStyle.transparentRoomListItem
                    : chatRoomStyle.purpleRoomListItem 
                }
                key = {roomIndex} 
                onClick={(e) => roomClickHandler(e, roomDocs.roomID, buddyUsername)}
            > 

                {buddyUsername}
            </div>
        )
    });

    return (
        <div>
            {userRoomDocsUI}
        </div>
    )
}

export default ChatRoomList;