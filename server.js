const Moralis = require("moralis");
const express = require("express");
const Parse = require("parse/node");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var fs = require("fs");
const { create, globSource } = require("ipfs-http-client");
const ipfs = create("http://139.59.75.20:5001");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const OrbitDB = require("orbit-db");
var Gun = require("gun");

require("dotenv").config();

//initialize Moralis
Moralis.initialize("RrKpMiHThO0v1tXiKcxJuBacU35i7UidwNwQq0as");

Moralis.serverURL = "https://58zywcsvxppw.usemoralis.com:2053/server";

app.use(cors());

app.set("view engine", "ejs");
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

//Database Linking
//app.use(Gun.serve);
app.listen(port, () => {
  console.log(`server is listening on Port  ${port}`);
});

//Gun({ web: server });

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const client = new MongoClient(uri);

// Database Name
const dbName = "dbeats";
var last1000Played = [];

const DatabaseJSONStructure = {
  wallet_id: "",
  password: "",
  confirm_password: "",
  livepeer_data: {
    lastSeen: 0,
    isActive: false,
    record: false,
    suspended: false,
    sourceSegments: 0,
    transcodedSegments: 0,
    sourceSegmentsDuration: 0,
    transcodedSegmentsDuration: 0,
    sourceBytes: 0,
    transcodedBytes: 0,
    name: "",
    profiles: [{ name: "", bitrate: 0, fps: 0, width: 0, height: 0 }],
    kind: "stream",
    userId: "",
    id: "",
    createdAt: 0,
    streamKey: "",
    playbackId: "",
    createdByTokenName: "",
    createdByTokenId: "",
    multistream: { targets: [] },
  },
  album_count: 0,
  bio: "",
  followee_count: 0,
  follower_count: 0,
  is_verified: false,
  location: null,
  playlist_count: 0,
  repost_count: 0,
  track_count: 0,
  username: "",
  id: "",
  name: "",
  createdAt: { $date: "" },
  updatedAt: { $date: "" },
  __v: 0,
  videos: [
    {
      videoName: "",
      videoImage: "",
      link: "",
      category: "",
      ratings: "",
      tags: "",
      description: "",
      allowAttribution: "",
      commercialUse: "",
      derivativeWorks: "",
      time: 0,
    },
  ],
  tracks: [
    {
      trackName: "",
      trackImage: "",
      link: "",
      genre: "",
      mood: "",
      tags: "",
      description: "",
      isrc: "",
      iswc: "",
      allowAttribution: "",
      commercialUse: "",
      derivativeWorks: "",
      time: 0,
    },
  ],
  subscribed: [{ name: "", username: "" }],
  subscribers: [{ name: "", username: "" }],
};

const trackRouter = require("./routes/track");

var testAPIRouter = require("./routes/api_status");
const userRouter = require("./routes/userRoutes");

app.use("/track", trackRouter);
app.use("/user", userRouter);

app.use("/API-status", testAPIRouter);

// create a GET route
app.get("/express_backend", (req, res) => {
  //Line 9
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});

async function connectDB() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const collection = db.collection("data");

  // create a document to be inserted
  //const orbitdb = await OrbitDB.createInstance(ipfs);

  // Create a database with docstore type
  //const dbd = await orbitdb.create("dbeat", "docstore");
  //await dbd.load();

  // Create / Open a database & fecth objects by Username
  //dbd = await orbitdb.docs("dbeats", { indexBy: "username" });
  //await dbd.load();

  //const hash = await dbd.put();
  //const profile = await dbd.del("Rushi");

  //const profile2 = dbd.get("");
  //const obj = JSON.parse(profile2);

  //console.log(profile2);

  return "done.";
}

app.get("/data", (req, res) => {
  const value = dbd.all;

  res.return(value);
});
// app.get("/", (req, res) => {
//   res.render("home");
// });

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/feed", (req, res) => {
  loadFeed("feed", res);
});

// app.get("/:username", (req, res) => {

//   loadArtist(req.params.username,res);
//   res.send("Your name is "+ req.params.username + "\n");
// });

// app.get("/:username/:track", (req, res) => {

//   loadTrack(req.params.username, req.params.track,res)

// });

app.post("/signup", (req, res) => {
  const walletID = req.body.walletId;
  const fullName = req.body.name;
  const userName = req.body.username;

  saveToDBSignUp(walletID, fullName, userName);

  res.redirect("/feed");
});

app.post("/upload-video", (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const {
    userName,
    videoName,
    category,
    ratings,
    tags,
    description,
    allowAttribution,
    commercialUse,
    derivativeWorks,
  } = req.body;

  const { videoImage, videoFile } = req.files;

  const userId = req.body.userName;
  const file = req.files.videoFile;
  const albumFile = req.files.videoImage;

  var currentTimeInSeconds = Math.floor(Date.now() / 1000); //unix timestamp in seconds

  const time = currentTimeInSeconds;

  const fileName = videoFile.name + path.extname(videoFile.name); //path.extname(videoFile.name)
  const filePath = fileName;

  const videoArtPath = videoImage.name;

  var videoHashLink = null;
  var albumhashLink = null;

  file.mv(filePath, async (err) => {
    try {
      const fileHash = await addFile(filePath);

      videoHashLink = "https://ipfs.io/ipfs/" + fileHash;
      console.log("video Uploaded Successfully!: " + fileHash);

      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });

      // video Uploaded Now Upload AlbumArt
      albumFile.mv(videoArtPath, async (err) => {
        try {
          const fileHash = await addFile(videoArtPath);

          albumhashLink = "https://ipfs.io/ipfs/" + fileHash;
          console.log("Album Art Uploaded Successfully!: " + fileHash);

          fs.unlink(videoArtPath, (err) => {
            if (err) console.log(err);
          });

          //AlbumArt Uploaded Now Save Both to DB
          console.log(
            "video Link : " +
              videoHashLink +
              "\nAlbumArt Link : " +
              albumhashLink
          );

          if (albumhashLink != null && videoHashLink != null) {
            console.log("Saving To Database!");
            saveVideoToDB(
              userId,
              videoName,
              albumhashLink,
              videoHashLink,
              category,
              ratings,
              tags,
              description,
              allowAttribution,
              commercialUse,
              derivativeWorks,
              time
            );

            return res.status(201).send("Video Uploaded Successfully!");
          } else {
            console.log("ERRRRRRRRRRRRRRRR");

            return res.render("upload", { error: "Error!" });
          }

          if (err) {
            console.log("Error : failed to Upload the Album Art File");
            return res.status(500).send(err);
          }
        } catch (error) {
          console.log(error);
        }
      });

      if (err) {
        console.log("Error : failed to Upload the Video File");
        return res.status(500).send(err);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

app.post("/upload", (req, res) => {
  var datetime = new Date();
  console.log(datetime);
  console.log("-----------REQUEST DATA-----------\n");
  // const obj = JSON.stringify(req.body)
  // Store JSON data in a JS variable

  const {
    userName,
    trackName,
    genre,
    mood,
    tags,
    description,
    isrc,
    iswc,
    allowAttribution,
    commercialUse,
    derivativeWorks,
  } = req.body;

  const { trackImage, trackFile } = req.files;

  const userId = req.body.userName;
  const file = req.files.trackFile;
  const albumFile = req.files.trackImage;

  var currentTimeInSeconds = Math.floor(Date.now() / 1000); //unix timestamp in seconds

  const time = currentTimeInSeconds;

  const fileName = trackFile.name + path.extname(trackFile.name); //path.extname(trackFile.name)
  const filePath = fileName;

  const trackArtPath = trackImage.name;

  var trackHashLink = null;
  var albumhashLink = null;

  file.mv(filePath, async (err) => {
    try {
      const fileHash = await addFile(filePath);

      trackHashLink = "https://ipfs.io/ipfs/" + fileHash;
      console.log("Track Uploaded Successfully!: " + fileHash);

      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });

      // Track Uploaded Now Upload AlbumArt
      albumFile.mv(trackArtPath, async (err) => {
        try {
          const fileHash = await addFile(trackArtPath);

          albumhashLink = "https://ipfs.io/ipfs/" + fileHash;
          console.log("Album Art Uploaded Successfully!: " + fileHash);

          fs.unlink(trackArtPath, (err) => {
            if (err) console.log(err);
          });

          //AlbumArt Uploaded Now Save Both to DB
          console.log(
            "Track Link : " +
              trackHashLink +
              "\nAlbumArt Link : " +
              albumhashLink
          );

          if (albumhashLink != null && trackHashLink != null) {
            console.log("Saving To Database!");
            saveTrackToDB(
              userName,
              trackName,
              albumhashLink,
              trackHashLink,
              genre,
              mood,
              tags,
              description,
              isrc,
              iswc,
              allowAttribution,
              commercialUse,
              derivativeWorks,
              time
            );

            return res.status(201).send("Track Uploaded Successfully!");
          } else {
            console.log("ERRRRRRRRRRRRRRRR");

            return res.render("upload", { error: "Error!" });
          }

          if (err) {
            console.log("Error : failed to Upload the Album Art File");
            return res.status(500).send(err);
          }
        } catch (error) {
          console.log(error);
        }
      });

      if (err) {
        console.log("Error : failed to Upload the Track File");
        return res.status(500).send(err);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

app.post("/upload-nft", (req, res) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req);
  const { videoFile } = req.files;
  const { metadata } = req.body;

  const file = req.files.videoFile;
  const fileName = videoFile.name + path.extname(videoFile.name); //path.extname(videoFile.name)
  const filePath = fileName;
  console.log(metadata, JSON.parse(metadata));

  let videoHashLink = null;
  // fs.writeFile(`${randNum}`, metadata, (err) => {
  //   // throws an error, you could also catch it here
  //   if (err) throw err;

  //   // success case, the file was saved
  //   console.log('Metadata created!');
  // });
  // let metadataHash = await addFile(`${randNum}`);
  // fs.unlink(`${randNum}`, (err) => {
  //   if (err) console.log(err);
  // });

  file.mv(filePath, async (err) => {
    try {
      let metadataHash = await addFile("metadata.json", metadata);
      let metadataHashLink = "https://ipfs.io/ipfs/" + metadataHash;

      const fileHash = await addFile(filePath);

      videoHashLink = "https://ipfs.io/ipfs/" + fileHash;
      console.log("video Uploaded Successfully!: " + fileHash);
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });

      if (err) {
        console.log("Error : failed to Upload the Video File");
        return res.status(500).send(err);
      }
      return res.status(201).send([videoHashLink, metadataHashLink]);
    } catch (error) {
      console.log(error);
    }
  });
});

const addFile = async (filePath, contentString = false) => {
  if (contentString == false) {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({ path: filePath, content: file });
  } else {
    const fileAdded = await ipfs.add(
      { path: "metadata.json", content: contentString },
      { wrapWithDirectory: true }
    );
  }

  const file =
    contentString != false ? contentString : fs.readFileSync(filePath);
  const fileAdded = await ipfs.add({ path: filePath, content: file });
  console.log(fileAdded);
  //const fileHash = fileAdded[0].hash;

  return fileAdded.cid;
};

app.post("/count-play", async (req, res) => {
  /*Use This Code Below when want to Increment play count of the track uploaded on DBeats 
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  var myquery = { trackId: req.body.trackId };
  var newvalues = {
    $inc: {
      tracks: {
        playCount: 1,
      },
    },
  };
  db.collection("users").updateOne(myquery, newvalues, { upsert: true });
*/
  //res.json(value.data);

  //Below part adds the latest played track to the array of last played 1000 Tracks

  last1000Played.push(req.body.trackId);

  console.log(last1000Played);
  res.send("Play Counted :" + req.body.trackId);
});

app.get("/tracks/trending", (req, res) => {
  res.send(last1000Played);
});

app.get("/dbeats-music", async (req, res) => {
  var data = [];
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  var myquery = { tracks: { $exists: true } };

  var cursor = db
    .collection("users")
    .find(myquery, { livepeer_data: 0, multistream_platform: 0, _id: 0 });
  cursor.forEach(
    function (doc, error) {
      data.push(doc);
    },
    function () {
      client.close();
      res.send({ data });
    }
  );

  //res.send(last1000Played);
});

async function saveToDBSignUp(walletID, fullName, userName) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const collection = db.collection("data");

  collection.insertOne({
    userId: walletID,
    fullName: fullName,
    userName: userName,
  });

  return "done.";
}
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function saveTrackToDB(
  userId,
  trackName,
  trackImage,
  link,
  genre,
  mood,
  tags,
  description,
  isrc,
  iswc,
  allowAttribution,
  commercialUse,
  derivativeWorks,
  time
) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  console.log("Trying to add new Song By :" + userId);

  //console.log(makeid(6));
  var trackId = makeid(6);
  var myquery = { username: userId };
  var newvalues = {
    $push: {
      tracks: {
        trackId: trackId,
        trackName: trackName,
        trackImage: trackImage,
        link: link,
        genre: genre,
        mood: mood,
        tags: tags,
        description: description,
        isrc: isrc,
        iswc: iswc,
        allowAttribution: allowAttribution,
        commercialUse: commercialUse,
        derivativeWorks: derivativeWorks,
        time: time,
      },
    },
  };
  // create a document to be inserted
  //const doc = { userId: userId, tracks: {trackName: trackName, link: link , genre: genre, tags:tags, description:description }};
  db.collection("users").updateOne(myquery, newvalues, { upsert: true });
  // const result = await collection.insertOne(doc);
  // the following code examples can be pasted here...
  console
    .log
    //` documents were inserted with the _id: ${result.insertedId}`,
    ();
  console.log("Track Added! : " + trackId);

  var a = new Date(time * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;

  console.log("Log: " + time);

  return "done.";
}

async function saveVideoToDB(
  userId,
  videoName,
  videoImage,
  link,
  category,
  ratings,
  tags,
  description,
  allowAttribution,
  commercialUse,
  derivativeWorks,
  time
) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  console.log("Trying to Upload new Video By :" + userId);

  var myquery = { username: userId };
  var newvalues = {
    $push: {
      videos: {
        videoId: makeid(7),
        videoName: videoName,
        videoImage: videoImage,
        link: link,
        category: category,
        ratings: ratings,
        tags: tags,
        description: description,
        allowAttribution: allowAttribution,
        commercialUse: commercialUse,
        derivativeWorks: derivativeWorks,
        time: time,
      },
    },
  };
  // create a document to be inserted
  //const doc = { userId: userId, videos: {videoName: videoName, link: link , genre: genre, tags:tags, description:description }};
  db.collection("users").updateOne(myquery, newvalues, { upsert: true });
  // const result = await collection.insertOne(doc);
  // the following code examples can be pasted here...
  console
    .log
    //` documents were inserted with the _id: ${result.insertedId}`,
    ();
  console.log("Video Added!:");

  var a = new Date(time * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;

  console.log("Log: " + time);

  return "done.";
}

async function loadFeed(page, res) {
  connectDB();
  const db = client.db(dbName);
  const collection = db.collection("data");

  try {
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length > 0) {
        console.log(result[0].tracks[0].trackName);
      }
      res.render(page, { result });
    });
  } catch (error) {
    console.log(error);
  }
}

async function loadArtist(username, res) {
  connectDB();
  const db = client.db(dbName);
  const collection = db.collection("data");
  const query = { username: username };

  collection.findOne(query).then((result) => {
    if (result) {
      console.log(result);
      return result;
    } else {
      var alert = "No document matches the provided query.";
      console.log(alert);
      return alert;
    }
    return result;
  });
}

async function loadTrack(username, track, res) {
  connectDB();
  const db = client.db(dbName);
  const collection = db.collection("data");
  const query = { username: username };

  collection.findOne(query).then((result) => {
    if (result) {
      console.log(result.tracks.length);
      for (var i = 0; i < result.tracks.length; i++) {
        console.log(i + "th TRACK -----");
        var trckName = result.tracks[i];
        if (trckName.trackName == track) {
          console.log("Track Found:");
          res.render("upload", { trckName });
        }
        //console.log( result.tracks[i].toArray().find(track));
      }

      return result;
    } else {
      var alert = "No document matches the provided query.";
      console.log(alert);
      return alert;
    }
    return result;
  });
}

async function main() {
  const args = minimist(process.argv.slice(2));
  const token = args.token;

  if (!token) {
    return console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  if (args._.length < 1) {
    return console.error("Please supply the path to a file or directory");
  }

  const storage = new Web3Storage({ token });
  const files = [];

  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path);
    files.push(...pathFiles);
  }

  console.log(`Uploading ${files.length} files`);
  const cid = await storage.put(files);
  console.log("Content added with CID:", cid);
}

//FOR VIDEO SECTION
const router = express.Router();
const axios = require("axios");

const livepeerKey = process.env.LIVEPEER_KEY;
const AuthStr = "Bearer ".concat(livepeerKey);

const activeStreamUrl = `https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "isActive", "value": true}]`;
const idleStreamUrl = `https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "isActive", "value": false}]`;

app.use(cors());
app.use(express.json());

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
  const value = await axios.get(activeStreamUrl, {
    headers: {
      Authorization: AuthStr,
    },
  });
  res.json(value.data);
});

app.post("/patch_multistream", async (req, res) => {
  let patchData = req.body.patchStreamData;
  console.log(patchData);
  let apiUrl = `https://livepeer.com/api/stream/${req.body.stream_id}`;

  const userValue = await axios({
    method: "GET",
    url: apiUrl,
    headers: {
      "content-type": "application/json",
      Authorization: AuthStr,
    },
  });
  console.log(userValue);
  let patchStreamData = {
    multistream: {
      targets: patchData,
    },
  };

  console.log(patchStreamData);

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
  console.log(value.data);
  res.json(value.data);
});

// app.listen(port, function () {
//   console.log("Listening on port");
// });
