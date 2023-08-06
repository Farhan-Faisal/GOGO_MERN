import { useEffect, useState} from "react";
import {io} from 'socket.io-client'

import Axios from "axios";
import jwt_decode from "jwt-decode";

import common_styles from "../styles/common_styles.module.css";
import chatRoomStyle from "./ChatRoom.module.css";

import ChatRoomList from "./ChatRoomList";
import ChatMessageInput from "./ChatMessageInput";
import ScrollableChatBox from "./ScrollableChatBox";
import configData from "../config.json";

// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
// npm install socket.io
// npm install socket.io-client
// https://codesandbox.io/s/scroll-container-e41687?from-embed=&file=/src/Components/ScrollContainer.tsx
// https://blog.bitsrc.io/building-a-scrollable-chat-box-with-react-b3848a4459fc

const ChatPage = () => {
    const [socket, setSocket] = useState(null);
    const userEmail = jwt_decode(localStorage.getItem("token")).userDetail.email
    
    /* Messages and chat history */
    const [message, setMessage] = useState({text: "", senderEmail: ""});
    const [chat, setChat] = useState([]); // Array of messages

    /* Typing and Timeout events */
    const [typing, setTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    /* Chat buddy and roomID */
    const [buddyUsername, setBuddyUsername] = useState("");
    const [roomID, setRoomID] = useState("");
    
    /*  Connect to socket backend || Need to specify url of socket server */
    useEffect(() => {
        setSocket(io(configData.SERVER_URL)); 
    }, []);

    /*  Join room and send-message event */
    useEffect(() => {
        if (socket !== null){
            socket.emit('join-room', {roomID});
            socket.on('message-from-server', (data) => {
                setChat((prev) => [...prev, data]);
            })
        }
    }, [socket]);

    /* Join room and typing events */
    useEffect(() => {
        if (socket !== null){
           
            socket.emit('join-room', {roomID});

            socket.on('typing-started-from-server', (roomID) => {
                console.log("typing...");
                setTyping(true);
            })
            
            socket.on('typing-ended-from-server', (roomID) => {
                setTyping(false);
            })
        }
    }, [chat, socket, message]);



    /* Get the existing chat history from mongoDB for this specific Room */
    const getChatHistory = async (roomID) => {
        await Axios.get(configData.SERVER_URL + "/api/chats/usingRoomID/" + roomID)
            .then((res) => { setChat(res.data.chatHistory); })
            .catch((error) => console.log(" this is the errorz" + error))
    }

    /* Update mongoDB chat history */
    const sendChatHandler = async (e) => {
        e.preventDefault();
        socket.emit("send-message", {message, roomID}); // send an event from our client

        if (message.text !== ""){
            setChat((prev) => [...prev, message]);
            socket.emit("end-typing", {roomID});

            // Make an API call to set chat history
            await Axios.patch(configData.SERVER_URL + "/api/chats/" + roomID, {
                newMessage:message,
                currentChatHistory: chat,
            });

            setMessage({text: "", senderEmail: ""});
        }
    }

    /* Handle ongong user input correctly */
    const handleInput = (event) => {
        setMessage({ text: event.target.value, senderEmail: userEmail });
        socket.emit('start-typing', {roomID});

        // Debounce effect
        if (typingTimeout) clearTimeout(typingTimeout);
        
        setTypingTimeout(
            setTimeout(() => {
                socket.emit("end-typing", {roomID});
            }, 5000)
        )
    }

    return (
        <div className={common_styles.rightContainer}>
            <div className={common_styles.squishHeading}>
                CHATS
            </div>

            <div className={chatRoomStyle.twoColumnContainer}>

                <div className={chatRoomStyle.chatRoomListContainer}>
                    <ChatRoomList 
                        roomID={roomID} setRoomID={setRoomID} userEmail={userEmail}
                        getChatHistory={getChatHistory} setBuddyUsername={setBuddyUsername}
                    />
                </div>

                {(roomID !== "") && <div className={chatRoomStyle.chatRoomContainer}>
                    <div style={{height: "400px",width: "100%",border: "2px solid white"}}>
                            <ScrollableChatBox chat={chat} userEmail={userEmail}/>              
                    </div>

                    <ChatMessageInput 
                        typing={typing} message={message} setMessage={setMessage} 
                        sendChatHandler={sendChatHandler} handleInput={handleInput}
                        buddyUsername={buddyUsername}
                    />
                </div>}

            </div>
        </div>
    )
}

export default ChatPage;