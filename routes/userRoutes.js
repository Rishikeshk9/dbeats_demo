const router = require('express').Router();
const Str = require('@supercharge/strings');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const livepeerKey = process.env.LIVEPEER_KEY;
const AuthStr = 'Bearer '.concat(livepeerKey);

let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const walletID = req.body.wallet_id;
  const fullName = req.body.name;
  const userName = req.body.username;
  const livepeerData = req.body.livepeer_data;
  const password = req.body.password;
  const confirmPassword = req.body.confirm_password;
  const userId = Str.random(5);

  let data = {
    username: userName,
    id: userId,
    name: fullName,
    wallet_id: walletID,
    livepeer_data: livepeerData,
    password: password,
    confirm_password: confirmPassword,
  };

  //console.log('add data', data);

  const newUser = new User({
    username: userName,
    id: userId,
    name: fullName,
    wallet_id: walletID,
    livepeer_data: livepeerData,
    password: password,
    confirm_password: confirmPassword,
  });

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => {
      //console.log(err);
      res.status(400).json('Error: ' + err);
    });

  let webTriggerUrl = `http://localhost:5000/user/triggernotification/${userName}`;

  let webData = {
    events: ['stream.started'],
    url: webTriggerUrl,
    name: `Dbeats webhooks`,
  };

  axios({
    method: 'post',
    url: 'https://livepeer.com/api/webhook',
    data: webData,
    headers: {
      'content-type': 'application/json',
      Authorization: AuthStr,
    },
  })
    .then(function (response) {
      //console.log("esponse", response.data);
      res.send('success');
    })
    .catch(function (error) {
      console.log(error.data);
    });
});

router.route('/login').post(async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user_username = await User.findOne({ username: username });
    const isMatch = bcrypt.compare(password, user_username.password);
    //console.log(username, ' ', password);
    if (isMatch) {
      res.send(user_username);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).send('Invalid Login');
  }
});

router.route('/:username').get(async (req, res) => {
  try {
    const getuserData = req.params.username;

    const userData = await User.findOne({ username: getuserData });
    res.send(userData);
  } catch (err) {
    res.send('Try Again');
  }
});

router.route('/get_user_by_id/:streamID').get(async (req, res) => {
  try {
    const stream_id = req.params.streamID;

    const userData = await User.findOne({
      'livepeer_data.id': stream_id,
    });
    res.send(userData);
  } catch (err) {
    res.send('Try Again');
  }
});

router.route('/getuser_by_wallet/:walletId').get(async (req, res) => {
  try {
    const wallet_id = req.params.walletId;

    const userData = await User.findOne({ wallet_id: wallet_id });
    res.send(userData);
  } catch (err) {
    //console.log(err)
    res.send('Try Again');
  }
});

router.route('/add_multistream_platform').post(async (req, res) => {
  try {
    const data = {
      selected: 0,
      platform: req.body.platform,
    };
    const user = req.body.username;
    User.findOneAndUpdate(
      { username: user },
      { $push: { multistream_platform: data } },
      function (error, success) {
        if (error) {
        } else {
        }
      },
    );

    res.send('success');
  } catch (err) {
    res.send('multistream_error');
  }
});

router.route('/follow').post(async (req, res) => {
  try {
    const following = req.body.following;
    const follower = req.body.follower;
    User.findOneAndUpdate(
      { username: following },
      { $push: { follower_count: follower } },
    );
    User.findOneAndUpdate(
      { username: follower },
      { $push: { followee_count: following } },
    );
    res.send('success');
  } catch (err) {
    console.log(err);
  }
});

router.route('/unfollow').post(async (req, res) => {
  try {
    const following = req.body.following;
    const follower = req.body.follower;
    User.findOneAndUpdate(
      { username: following },
      { $pull: { follower_count: follower } },
    );
    User.findOneAndUpdate(
      { username: follower },
      { $pull: { followee_count: following } },
    );
    User.findOneAndUpdate(
      { username: follower },
      { $pull: { pinned: following } },
    );
    res.send('success');
  } catch (err) {
    console.log(err);
  }
});

router.route('/:username/favorites').get(async (req, res) => {
  try {
    const getuserData = req.params.username;

    const userData = await User.findOne(
      { username: getuserData },
      { favorite_tracks: 1, _id: 0 },
    );

    res.send(userData);
  } catch (err) {
    res.send('Try Again');
  }
});

router.route('/favorite').post(async (req, res) => {
  try {
    const uname = req.body.username;
    const track = req.body.track_id;
    User.findOneAndUpdate(
      { username: uname },
      { $push: { favorite_tracks: track } },
      function (error, success) {
        if (error) {
          res.send(error);
        } else {
          res.send(success);
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
});

router.route('/unfavorite').post(async (req, res) => {
  try {
    const uname = req.body.username;
    const track = req.body.track_id;
    User.findOneAndUpdate(
      { username: uname },
      { $pull: { favorite_tracks: track } },
      function (error, success) {
        if (error) {
          res.send(error);
        } else {
          res.send(success);
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
});

router.route('/reactions').post(async (req, res) => {
  try {
    const videoUsername = req.body.videousername;
    const reactUsername = req.body.reactusername;
    const videoreaction = req.body.reaction;
    const videostreamid = req.body.videostreamid;
    const videoindex = req.body.videoindex;
    const videolink = req.body.videolink;
    const videoname = `${videostreamid}/${videoindex}`;
    const user = await User.findOne({ username: videoUsername });

    //console.log(user)
    let count = -1;
    for (let i = 0; i < user.videos.length; i++) {
      if (user.videos[i].link === videolink) {
        count = i;
        break;
      }
    }
    //console.log(count)

    let yourdata = {
      reaction: videoreaction,
      link: videoname,
      video: user.videos[videoindex],
    };

    if (count != -1) {
      let data = user.videos;
      if (!data[count].reaction) {
        data[count].reaction = {
          like: [],
          dislike: [],
          angry: [],
          happy: [],
        };
      }

      if (videoreaction === 'like')
        data[count].reaction.like.push(reactUsername);
      else if (videoreaction === 'dislike')
        data[count].reaction.dislike.push(reactUsername);
      else if (videoreaction === 'angry')
        data[count].reaction.angry.push(reactUsername);
      else if (videoreaction === 'happy')
        data[count].reaction.happy.push(reactUsername);

      User.findOneAndUpdate(
        { username: videoUsername },
        { $set: { videos: data } },
        { upsert: true },
        function (error, success) {
          if (error) {
          } else {
          }
        },
      );
      User.findOneAndUpdate(
        { username: reactUsername },
        { $push: { your_reactions: yourdata } },
        function (error, success) {
          if (error) {
          } else {
          }
        },
      );
    }
    res.send('success');
  } catch (err) {
    console.log(err);
  }
});

router.route('/getreactions').post(async (req, res) => {
  try {
    const videoUsername = req.body.videousername;
    const videolink = req.body.videolink;
    const user = await User.findOne({ username: videoUsername });

    let count = -1;
    for (let i = 0; i < user.videos.length; i++) {
      if (user.videos[i].link === videolink) {
        //console.log(user.videos[i].link);
        res.send(user.videos[i]);
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.route('/getuserreaction').post(async (req, res) => {
  try {
    const videoUsername = req.body.videousername;
    const reactUsername = req.body.username;
    const videoname = req.body.videoname;
    const videolink = req.body.videolink;
    const user = await User.findOne({ username: videoUsername });

    // console.log(req.body);
    // console.log(user);

    let count = -1;
    for (let i = 0; i < user.videos.length; i++) {
      if (user.videos[i].link === videolink) {
        count = i;
        break;
      }
    }

    if (count != -1) {
      let data = user.videos;
      if (!data[count].reaction) {
        data[count].reaction = {
          like: [],
          dislike: [],
          angry: [],
          happy: [],
        };
      }

      if (data[count].reaction.like.indexOf(reactUsername) > -1) {
        res.send('like');
      } else if (
        data[count].reaction.dislike.indexOf(reactUsername) > -1
      ) {
        res.send('dislike');
      } else if (
        data[count].reaction.angry.indexOf(reactUsername) > -1
      ) {
        res.send('angry');
      } else if (
        data[count].reaction.happy.indexOf(reactUsername) > -1
      ) {
        res.send('happy');
      } else {
        res.send(null);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.route('/removeuserreaction').post(async (req, res) => {
  try {
    //console.log(req.body);
    const videoUsername = req.body.videousername;
    const reactUsername = req.body.reactusername;
    const oldreaction = req.body.oldreaction;
    const newreaction = req.body.newreaction;
    const videostreamid = req.body.videostreamid;
    const videoindex = req.body.videoindex;
    const videoname = `${videostreamid}/${videoindex}`;
    const videolink = req.body.videolink;
    const user = await User.findOne({ username: videoUsername });
    const reactuser = await User.findOne({ username: reactUsername });

    //console.log(user)
    let count = -1;
    for (let i = 0; i < user.videos.length; i++) {
      if (user.videos[i].link === videolink) {
        count = i;
        break;
      }
    }
    //console.log(count)

    if (count != -1) {
      let data = user.videos;
      if (oldreaction === newreaction) {
        if (oldreaction === 'like')
          data[count].reaction.like.pop(reactUsername);
        else if (oldreaction === 'dislike')
          data[count].reaction.dislike.pop(reactUsername);
        else if (oldreaction === 'angry')
          data[count].reaction.angry.pop(reactUsername);
        else if (oldreaction === 'happy')
          data[count].reaction.happy.pop(reactUsername);
      } else {
        if (oldreaction === 'like')
          data[count].reaction.like.pop(reactUsername);
        else if (oldreaction === 'dislike')
          data[count].reaction.dislike.pop(reactUsername);
        else if (oldreaction === 'angry')
          data[count].reaction.angry.pop(reactUsername);
        else if (oldreaction === 'happy')
          data[count].reaction.happy.pop(reactUsername);

        if (newreaction === 'like')
          data[count].reaction.like.push(reactUsername);
        else if (newreaction === 'dislike')
          data[count].reaction.dislike.push(reactUsername);
        else if (newreaction === 'angry')
          data[count].reaction.angry.push(reactUsername);
        else if (newreaction === 'happy')
          data[count].reaction.happy.push(reactUsername);
      }
      //console.log(data);

      User.findOneAndUpdate(
        { username: videoUsername },
        { $set: { videos: data } },
        function (error, success) {
          if (error) {
          } else {
          }
        },
      );
    }

    let yourReactionData = {
      reaction: newreaction,
      link: videoname,
      video: user.videos[videoindex],
    };

    let yourcount = -1;
    for (let i = 0; i < reactuser.your_reactions.length; i++) {
      if (reactuser.your_reactions[i].link === videoname) {
        yourcount = i;
        break;
      }
    }
    //console.log(yourcount);
    if (yourcount != -1) {
      let yourdata = reactuser.your_reactions;
      // console.log('all data', yourdata);
      yourdata.splice(yourcount, 1);
      // console.log('splice', yourdata);
      if (oldreaction !== newreaction) {
        yourdata.push(yourReactionData);
      }
      // console.log('push', yourdata);
      User.findOneAndUpdate(
        { username: reactUsername },
        { $set: { your_reactions: yourdata } },
        function (error, success) {
          if (error) {
          } else {
          }
        },
      );
    }
    res.send('success');
  } catch (err) {
    console.log(err);
  }
});

router.route('/pinned').post(async (req, res) => {
  try {
    const username = req.body.username;
    const pinnedUser = req.body.pinneduser;
    User.findOneAndUpdate(
      { username: username },
      { $push: { pinned: pinnedUser } },
      function (error, success) {
        if (error) {
          res.send(error);
        } else {
          res.send(success);
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
});

router.route('/unpin').post(async (req, res) => {
  try {
    const username = req.body.username;
    const pinnedUser = req.body.pinneduser;
    User.findOneAndUpdate(
      { username: username },
      { $pull: { pinned: pinnedUser } },
      function (error, success) {
        if (error) {
          res.send(error);
        } else {
          res.send(success);
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
});

router.route('/announcement').post(async (req, res) => {
  try {
    const username = req.body.username;
    const announcement = req.body.announcement;
    const post_image = req.body.postImage;
    const post_video = req.body.postVideo;
    const link = req.body.link;
    const user = await User.findOne({ username: username });
    const announcementData = {
      announcement: announcement,
      post_image: post_image,
      post_video: post_video,
      link: link,
    };
    user.follower_count.forEach(function (id) {
      //console.log(id);
      User.updateOne(
        { username: id },
        { $push: { notification: announcementData } },
        function (error, success) {
          if (error) {
            res.send(error);
          } else {
            res.send(success.notification);
          }
        },
      );
    });
    res.send('Hello');
  } catch (err) {
    console.log(err);
  }
});

router.route('/seennotification').post(async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username: username });
    let data = [];
    if (user.oldnotification.length > 0) {
      data = user.oldnotification;
    }
    for (let i = 0; i < user.notification.length; i++) {
      data.push(user.notification[i]);
    }
    //console.log(data);
    await User.update({ username: username }, { notification: [] });
    await User.update(
      { username: username },
      { oldnotification: data },
    );
    res.send('Hello');
  } catch (err) {
    console.log(err);
  }
});

router
  .route('/triggernotification/:username')
  .get(async (req, res) => {
    try {
      const username = req.params.username;
      //console.log(username);
    } catch (err) {
      console.log(err);
    }
  });

router.route('/playlist').post(async (req, res) => {
  try {
    const playlistname = req.body.playlistname;
    const data = req.body.data;
    const username = req.body.username;
    const playlist_username = req.body.playlistUsername;
    const playlist_data_index = req.body.playlistDataIndex;

    const user = await User.findOne({ username: username });

    let count = -1;
    if (user.my_playlists) {
      for (let i = 0; i < user.my_playlists.length; i++) {
        if (user.my_playlists[i].playlistname === playlistname) {
          count = i;
          break;
        }
      }
    }

    if (count === -1) {
      let playlistdata = [];

      let sendData = {
        username: playlist_username,
        index: playlist_data_index,
        data: data,
      };

      playlistdata.push(sendData);

      const playlistData = {
        playlistname: playlistname,
        playlistdata: playlistdata,
      };
      User.findOneAndUpdate(
        { username: username },
        { $push: { my_playlists: playlistData } },
        function (error, success) {
          if (error) {
          } else {
          }
        },
      );
    } else {
      let playlistdata = user.my_playlists;

      let sendData = {
        username: playlist_username,
        index: playlist_data_index,
        data: data,
      };

      playlistdata[count].playlistdata.push(sendData);

      User.findOneAndUpdate(
        { username: username },
        { $set: { my_playlists: playlistdata } },
        function (error, success) {
          if (error) {
          } else {
          }
        },
      );
    }
    res.send('success');
  } catch (err) {
    console.log(err);
  }
});

/*router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
        user.wallet_id = req.body.walletId;

      user
        .save()
        .then(() => res.json("User Updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});*/
module.exports = router;
