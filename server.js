const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const router = express.Router();
const userRouter = require("./routes/userRoutes");
const axios = require("axios");

const port = process.env.PORT || 8000;

const Mongo_URI = "mongodb+srv://root:supersapiens@cluster0.p80zj.mongodb.net/dbeats?authSource=admin&replicaSet=atlas-4259e6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const dbName = "dbeats";

const livepeerKey = "d98e11c9-2267-4993-80da-6215d73b42c1";
const AuthStr = "Bearer ".concat(livepeerKey);

const activeStreamUrl = `https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "isActive", "value": true}]`;
const idleStreamUrl = `https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "isActive", "value": false}]`;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

//Connect to mongoose
mongoose.connect(Mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const client = new MongoClient(Mongo_URI);

//Require routes
app.get("/", async (req, res) => {
  var array = [];
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  var cursor = db.collection("users").find();
  cursor.forEach(
    function (doc, error) {
      array.push(doc);
    },
    function () {
      client.close();
      res.send({ array });
    }
  );
});

//Livepeer routes
app.post("/create_stream", async (req, res) => {
  let streamData = {
    name: req.body.name,
    profiles: req.body.profiles,
  };
  const value = await axios({
    method: "post",
    url: "https://livepeer.com/api/stream",
    data: streamData,
    headers: {
      "content-type": "application/json",
      Authorization: AuthStr,
    },
  });
  //console.log("Lets do :",value.data);
  res.json(value.data);
});

app.get("/get_activeusers", async (req, res) => {
  const value = await axios.get(idleStreamUrl, {
    headers: {
      Authorization: AuthStr,
    },
  });
  res.json(value.data);
});


// app.post("/create_multistream", async (req, res) => {
//   let streamData = {
//     name: req.body.name,
//     url: req.body.url,
//   };
  
//   const value = await axios({
//     method: "post",
//     url: "https://livepeer.com/api/multistream/target/",
//     data: streamData,
//     headers: {
//       "content-type": "application/json",
//       Authorization: AuthStr,
//     },
//   });
//   res.json(value.data);
// });

app.post("/patch_multistream", async (req, res) => {
  
  let platformName = req.body.name;
  let rtmp = req.body.url;

  let apiUrl = `https://livepeer.com/api/stream/${req.body.stream_id}`;

  const userValue = await axios({
    method: "GET",
    url: apiUrl,
    headers: {
      "content-type": "application/json",
      Authorization: AuthStr,
    },
  });

  //console.log(userValue.data.multistream)

  let data={
    profile:"source",
    spec:{
      name:platformName,
      url:rtmp
    }
  }

  let multiData= userValue.data.multistream.targets;

  multiData.push(data)

  let patchStreamData={
    multistream:{
      targets:multiData
    }
  }

  //console.log(patchStreamData.multistream)
  
  const value = await axios({
    method: "PATCH",
    url: apiUrl,
    data: patchStreamData,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Methods": "PATCH",
      Authorization: AuthStr,
    },
  });
  res.json(value.data);
});

app.listen(port, function () {
  console.log("Listening on port 8000");
});
