const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express(); ///
const port = process.env.PORT || 5000;
const securePort = 5000;
const passport = require("passport");
const fs = require('fs');

// SSL STUFF
const ssl_activation_file = fs.readFileSync('./SSLFiles/96009CC69D5977F61D22A19691E98197.txt');
const key = fs.readFileSync('./SSLFiles/private.key');
const cert = fs.readFileSync('./SSLFiles/certificate.crt');
const cred = {key, cert}


require("dotenv").config();

/* Boiler plate code to for cross origin applications */
app.use(cors({
  origin: ["http://localhost:3000", "https://gogo-chat.vercel.app"], // Add multiple origins directly
  allowedHeaders: ["my-custom-header", "Content-Type"],
  credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

/* Setup passport server */ // DEV-CGP-6
app.use(passport.initialize());
app.use(passport.session());

/*
  - Create an HTTP server using app
  - Need an HTTP server as socket server can only be connected to this
*/
const http = require('http'); 
const httpServer = http.createServer(app);

/*
  - Import socket server
  - Link socket server to HTTP server
*/
const { Server } = require("socket.io"); 
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://gogo-chat.vercel.app"], // Client side
    allowedHeaders: ["my-custom-header"], credentials: true
  }
}); 

/*
  Boiler plate code to respond to socket events sent from client
    - send-message || start-typing || end-typing || join-room || disconnect
*/ 
const sockets_bioler_plate = (socket) => {
  socket.on('send-message', ({message, roomID}) => {
    // console.log("Message received by server") // console.log(message)
    socket.broadcast.to(roomID).emit('message-from-server', message);
  });

  socket.on('start-typing', ({roomID}) => {
    let logMessage = "Typing began: " + roomID;
    socket.broadcast.to(roomID).emit('typing-started-from-server', logMessage);
  });

  socket.on('end-typing', ({roomID}) => {
    let logMessage = "Typing stopped: " + roomID;
    socket.broadcast.to(roomID).emit('typing-ended-from-server', logMessage);
  });

  socket.on("join-room", ({roomID}) => {
    socket.join(roomID);
  });

  socket.on("disconnect", (socket) => {
    console.log("User left");
  });
}

/* Start the socket server using boiler place configurations */
io.on("connection", sockets_bioler_plate);

/* Boiler plate code to connect to mongoDB */
app.use(express.static('public'));

/* Need this as part of Multer Configuration */
const bodyParser = require('body-parser');
app.use(
  bodyParser .urlencoded({ 
    extended: true,
  })
);

// Connect to MongoDB
const dbUri = process.env.ATLAS_URI;
mongoose.connect(dbUri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

// define routers
const emailAuthRouter = require("./routes/emailAuth.routes");
const userDetailsRouter = require("./routes/userDetails.routes");
const loginRouter = require("./routes/login.routes");
const usersRouter = require("./routes/users");
const interestRouter = require("./routes/interests");
const chatRouter = require("./routes/room.chat.routes");
const requestsRouter = require("./routes/request.routes");
const facebookRouter = require("./routes/facebook.routes")

// connect routers
app.use("/api", chatRouter);
app.use("/email-auth", emailAuthRouter);
app.use("/user-details", userDetailsRouter);
app.use("/api", interestRouter);
app.use("/login", loginRouter);
app.use("/api", usersRouter);
app.use("/requests", requestsRouter);
/* 
    - If more API_End_Point files (routes) have been added in the routes folder, only need to make changes in this section
    - Currently, routers for only two routes have been set up
    - In the routers below, need to give path to the js file containing the routes/API_End_Points
*/
app.use("/api", chatRouter);
app.use("/", facebookRouter);

/*
    - Server deployment indication
*/
app.get("/", (req, res) => {
	res.json({ message: `Server is running on securePort: ${securePort} || Deployed by CI/CD`});
});

app.get("/.well-known/pki-validation/96009CC69D5977F61D22A19691E98197.txt", (req, res) => {
    res.sendFile('./SSLFiles/96009CC69D5977F61D22A19691E98197.txt', {root: __dirname});
})

/* Listen on port 5000 */
httpServer.listen(securePort, () => {
  console.log(`Server is running on port: ${port} || Deployed by CI/CD`);
});
