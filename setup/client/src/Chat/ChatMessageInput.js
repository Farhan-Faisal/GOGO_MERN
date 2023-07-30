import { Box, InputLabel } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";

const ChatMessageInput = ({typing, message, sendChatHandler, handleInput, buddyUsername}) => {
    return (
        <Box component="form" onSubmit={sendChatHandler}>
            {
                typing && (
                    <InputLabel sx={{color: 'white', textAlign: 'left'}} shrink htmlFor="message-input">
                        {buddyUsername} is typing...
                    </InputLabel>
                )
            }   

            <OutlinedInput
                sx={{backgroundColor: 'white', color: 'black', width: '100%'}}
                id="outlined-adornment-password" 
                placeholder="Write your message"
                value={message.text} 
                onChange={(e) => handleInput(e)}

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

export default ChatMessageInput;