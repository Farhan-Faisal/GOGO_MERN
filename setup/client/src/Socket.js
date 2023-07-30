import { useEffect, useState, useRef} from "react";

import {io} from 'socket.io-client'

import { Box, Card, InputLabel, Typography } from "@mui/material";

import SendIcon from '@mui/icons-material/Send' // npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import Axios from "axios";
// import InputLabel from "@mui/material/InputLabel";

import jwt_decode from "jwt-decode";


import { IoSendSharp } from "react-icons/io";

// https://blog.bitsrc.io/building-a-scrollable-chat-box-with-react-b3848a4459fc // For react chatUI


import common_styles from "./styles/common_styles.module.css";
import chatRoomStyle from "./ChatRoom.module.css";


const ScrollContainer = ({chat, userEmail}) => {
    
    // These variables will help us scroll our divs to the dorrect position
    const outerDiv = useRef(null);
    const innerDiv = useRef(null);
    
    // start the container at the bottom
    useEffect(() => {
        const outerHeight = outerDiv.current.clientHeight;
        const innerHeight = innerDiv.current.clientHeight;

        // Scroll down to the latest message
        outerDiv.current.scrollTo({
            top: innerHeight - outerHeight,
            left: 0
        });
    }, []);

    // Same thing as above but does so when new messages are rendered
    useEffect(() => {
        const outerHeight = outerDiv.current.clientHeight;
        const innerHeight = innerDiv.current.clientHeight;

    
        outerDiv.current.scrollTo({
            top: 2*innerHeight - outerHeight,
            left: 0,
            behavior: "smooth"
        });
    }, [chat]);


    return (
        <div ref={outerDiv} style={{position: "relative", height: "100%", overflow: "scroll" }}>
          <div ref={innerDiv} style={{position: "relative"}}>
             { 
                chat.map((message, dataIndex) => (
                    <MessageContainer key = {dataIndex} message={message.text} 
                        position={(message.senderEmail.localeCompare(userEmail) === 0) ? "right": "left"}
                    /> 
                ))
            }
          </div>
        </div>
      )
}








// const Header = (props) => {

//     return(
//         <Card sx={{marginTop: 5, backgroundColor: "gray"}} raised>
//             <Link to="/">
//                 <Button sx={{color: "white", textDecoration: "none"}} variant="text">
//                     Home
//                 </Button>
//             </Link>

//             <Link to="/chats">
//                 <Button sx={{color: "white", textDecoration: "none"}} variant="text">
//                     Chats
//                 </Button>
//             </Link>

//             <Link to={`/room/${props.roomID}`}>
//                 <Button sx={{color: "white", textDecoration: "none"}} variant="text">
//                     Room1
//                 </Button>
//             </Link>
//         </Card>
//     )
// }


const MessageContainer = (props) => {
    return(
        <div className={chatRoomStyle.messageRow} key = {props.dataIndex}>
            <div className={chatRoomStyle.message}
                style={{
                    // textAlign: 'center',
                    // backgroundColor: 'black', color: 'white',  
                    // padding: 8, margin: 2, borderRadius: 20,
                    // width: 'fit-content', 
                    float: props.position,
                }}
            >
                {props.message}
            </div>
        </div>
    )
}

const SendChat = (props) => {
    return (
        <Box component="form" onSubmit={props.handleForm}>
            {
                props.typing && (
                    <InputLabel sx={{color: 'white'}} shrink htmlFor="message-input">
                        Typing...
                    </InputLabel>
                )
            }   

            <OutlinedInput
                sx={{backgroundColor: 'white', color: 'black', width: '100%'}}
                id="outlined-adornment-password" 
                placeholder="Write your message"
                value={props.message.text} 
                onChange={(e) => props.handleInput(e)}

                endAdornment={
                    <InputAdornment position="end">
                        <IconButton type='submit' aria-label="toggle password visibility">
                            <SendIcon/>
                        </IconButton>
                    </InputAdornment>
                }
            /> 
        </Box>
    )
}


const Socket = () => {

    const [socket, setSocket] = useState(null);


    const [message, setMessage] = useState({text: "", senderEmail: ""});

    const [chat, setChat] = useState([]); // Array of messages

    const [typing, setTyping] = useState(false); // Typing and Timeout events
    const [typingTimeout, setTypingTimeout] = useState(null);

    const roomID = "chatTest1@gmail.comchatTest2@gmail.com"; // Get this from use location
    const userEmail = "chatTest1@gmail.com"; // Get this from jwt
    const receiverEmail = "chatTest2@gmail.com"; // Can get this from database

    useEffect(() => {
        // connect to socket backend 
        // Need to specify url ofsocket server
        setSocket(io("http://localhost:5000")); 
    }, []);

    useEffect(() => {
        if (socket !== null){
            socket.emit('join-room', {roomID});
            socket.on('message-from-server', (data) => {

                setChat((prev) => [...prev, data]);
            })

            socket.on('typing-started-from-server', (roomID) => {
                // console.log("typing...");
                setTyping(true);
            })
            
            socket.on('typing-ended-from-server', (roomID) => {
                // console.log("typing stopped");
                setTyping(false);
            })
        }
    }, [socket]);


     const handleForm = async (e) => {
        e.preventDefault();
        socket.emit("send-message", {message, roomID}); // send an event from our client

        if (message.text !== ""){
            setChat((prev) => [...prev, message]);

            // Make an API call to set chat history
            await Axios.patch("http://localhost:5000/api/chats/" + roomID, {
                newMessage: message,
                currentChatHistory: chat,
            });
        }
        socket.emit("end-typing", {roomID});
        setMessage({text: "", senderEmail: ""});
    }

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
        {/* <Header roomID={roomID}/> */}
            <div className={chatRoomStyle.twoColumnContainer}>

                <div className={chatRoomStyle.chatRoomWrapContainer}>
                        This is the chat room list
                </div>

                <div className={chatRoomStyle.chatRoomWrapContainer}>
                    <div style={{height: "400px",width: "100%",border: "2px solid white"}}>
                            <ScrollContainer chat={chat} userEmail={userEmail}/>              
                    </div>

                    <SendChat 
                        typing={typing} 
                        message={message} setMessage={setMessage} 
                        handleForm={handleForm} handleInput={handleInput}
                    />
                </div>

            </div>
    </div>
    )
}

export default Socket;