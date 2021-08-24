// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose")
// const server = http.createServer(app);
// const socket = require("socket.io");
// const io = socket(server);
// const path=require("path");

// const users = {};

// const socketToRoom = {};

// io.on('connection', socket => {
//     socket.on("join room", roomID => {
//         if (users[roomID]) {
//             const length = users[roomID].length;
//             if (length === 5) {
//                 socket.emit("room full");
//                 return;
//             }
//             users[roomID].push(socket.id);
//         } else {
//             users[roomID] = [socket.id];
//         }
//         socketToRoom[socket.id] = roomID;
//         const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

//         socket.emit("all users", usersInThisRoom);
//     });

//     socket.on("sending signal", payload => {
//         io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
//     });

//     socket.on("returning signal", payload => {
//         io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
//     });

//     socket.on('disconnect', () => {
//         const roomID = socketToRoom[socket.id];
//         let room = users[roomID];
//         if (room) {
//             room = room.filter(id => id !== socket.id);
//             users[roomID] = room;
//         }
//     });

// });

// const port = process.env.PORT || 8000;
// server.listen(port, () => console.log(`server is running on port ${port}`));

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const {MongoClient} = require("mongodb");
const router= express.Router(); 
const userRouter = require("./routes/userRoutes");

const Mongo_URI = "mongodb+srv://root:supersapiens@cluster0.p80zj.mongodb.net/dbeats?authSource=admin&replicaSet=atlas-4259e6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const dbName = "dbeats";

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

//Connect to mongoose
mongoose.connect(Mongo_URI, {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true});

const client = new MongoClient(Mongo_URI);




//Require routes
app.get("/", async (req,res)=>{
    var array = [];
    await client.connect();
console.log("Connected successfully to server");
const db = client.db(dbName);
var cursor = db.collection("data").find();
cursor.forEach(function(doc,error){
    array.push(doc);
} ,function(){
    client.close();
    res.send({array});
})
})


app.listen(8000, function(){
    console.log("Listening on port 8000");
})