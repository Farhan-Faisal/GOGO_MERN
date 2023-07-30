const router = require('express').Router();
let RoomModel = require('../models/room.chat.model');

/* Get all chatRoom documents */
router.route("/chats").get(async (req, res) => {
    const chatRoomDocs = await RoomModel.find();
    res.send(chatRoomDocs);
});

/* Get all chatRoom documents of a user */
router.route("/chats/:email").get(async (req, res) => {
    const chatRoomDocs = await RoomModel.find();
    const userRoomsDocs = chatRoomDocs.filter(roomDoc => roomDoc.participants.includes(req.params.email));
    res.send(userRoomsDocs);
});


/* Get a single chatRoom identified by roomID */
router.route("/chats/usingRoomID/:roomID").get(async (req, res) => {
    const chatRoomDoc = await RoomModel.findOne({ roomID: req.params.roomID, });
    res.send(chatRoomDoc);
});


/* Post a new chat room */
router.route("/chats").post(async (req, res) => {

    const newRoomDoc = new RoomModel({
      participantsUsernames: req.body.participantsUsernames,
      chatHistory: req.body.chatHistory,
      participants: req.body.participants,
      roomID: req.body.roomID
    });
  
    const currentDatabaseRooms = await RoomModel.find({
      roomID: req.body.roomID,
    });
    
    if (currentDatabaseRooms.length === 0) {
      await newRoomDoc.save();
      console.log("chat room document posted");
      res.send(newRoomDoc);
    } else {
      res.status(400);
      console.log("Room already exists in database");
    }
});
  

/* Delete the chat room */
router.route("/chats/:roomID").delete(async (req, res) => {
    try {
      await RoomModel.deleteOne({ roomID: req.params.roomID });
      console.log("chat room deleted || roomID: " + req.params.roomID);
      res.status(204).send();
    } catch {
      console.log("This chat room does not exist");
    }
});


/* Update chat history of a particular chat room */
router.route("/chats/:roomID").patch(async (req, res) => {
    const newMessage = req.body.newMessage;
    var newChatHistory = req.body.currentChatHistory;
    newChatHistory.push(newMessage);

    try {
      await RoomModel.updateOne({roomID: req.params.roomID},{$set:{ chatHistory: newChatHistory}})
      console.log("Chat History updated || roomID: " + req.params.roomID);
      res.status(204).send();
    }
    catch{
        console.log("Error updating chat room");
    }
});

module.exports = router;