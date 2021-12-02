const router = require('express').Router();
const Str = require('@supercharge/strings');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const fs = require('fs');

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
      res.send('success');
    })
    .catch(function (error) {
      //console.log(error.data);
    });
});

router.route('/login').post(async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user_username = await User.findOne({ username: username });
    const isMatch = await bcrypt.compare(
      password,
      user_username.password,
    );
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
          res.send(error);
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

    //console.log(following);
    //console.log(follower);

    User.findOneAndUpdate(
      { username: following },
      { $push: { follower_count: follower } },
      function (error, success) {
        if (error) {
          res.send(error);
        }
      },
    );

    User.findOneAndUpdate(
      { username: follower },
      { $push: { followee_count: following } },
      function (error, success) {
        if (error) {
          res.send(error);
        }
      },
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

    console.log(following, follower);
    User.findOneAndUpdate(
      { username: following },
      { $pull: { follower_count: follower } },
      function (error, success) {
        if (error) {
          res.send(error);
        }
      },
    );
    User.findOneAndUpdate(
      { username: follower },
      { $pull: { followee_count: following } },
      function (error, success) {
        if (error) {
          res.send(error);
        }
      },
    );
    User.findOneAndUpdate(
      { username: follower },
      { $pull: { pinned: following } },
      function (error, success) {
        if (error) {
          res.send(error);
        }
      },
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
          res.send('success');
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
          res.send('success');
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

    let count = -1;
    for (let i = 0; i < user.videos.length; i++) {
      if (user.videos[i].link === videolink) {
        count = i;
        break;
      }
    }

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
            res.send(error);
          }
        },
      );
      User.findOneAndUpdate(
        { username: reactUsername },
        { $push: { your_reactions: yourdata } },
        function (error, success) {
          if (error) {
            res.send(error);
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
        res.send(user.videos[i]);
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

    let count = -1;
    for (let i = 0; i < user.videos.length; i++) {
      if (user.videos[i].link === videolink) {
        count = i;
        break;
      }
    }

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

      User.findOneAndUpdate(
        { username: videoUsername },
        { $set: { videos: data } },
        function (error, success) {
          if (error) {
            res.send(error);
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
    if (yourcount != -1) {
      let yourdata = reactuser.your_reactions;
      yourdata.splice(yourcount, 1);
      if (oldreaction !== newreaction) {
        yourdata.push(yourReactionData);
      }
      User.findOneAndUpdate(
        { username: reactUsername },
        { $set: { your_reactions: yourdata } },
        function (error, success) {
          if (error) {
            res.send(error);
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
          res.send('success');
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
          res.send('success');
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

    let post_image = null;
    let post_video = null;

    if (req.files) {
      post_image = req.files.postImage;
      post_video = req.files.postVideo;
    }

    const link = req.body.eventlink;
    const uploadHash = req.body.announcementHash
      ? req.body.announcementHash
      : null;

    const user = await User.findOne({ username: username });

    let postImg, postVid;

    if (post_video) {
      postVid =
        'https://ipfs.io/ipfs/' + uploadHash + '/' + post_video.name;
    }
    if (post_image) {
      postImg =
        'https://ipfs.io/ipfs/' + uploadHash + '/' + post_image.name;
    }

    const announcementData = {
      announcement: announcement,
      post_image: postImg,
      post_video: postVid,
      link: link,
      username: username,
    };

    user.follower_count.forEach(function (id) {
      User.updateOne(
        { username: id },
        { $push: { notification: announcementData } },
        function (error, success) {
          if (error) {
            res.send(error);
          }
        },
      );
    });

    User.updateOne(
      { username: username },
      { $push: { posts: announcementData } },
      function (error, success) {
        if (error) {
          res.send(error);
        }
      },
    );
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
    await User.updateOne(
      { username: username },
      { notification: [] },
      function (error, success) {
        if (error) {
          res.send(error);
        }
      },
    );
    await User.updateOne(
      { username: username },
      { oldnotification: data },
      function (error, success) {
        if (error) {
          res.send(error);
        }
      },
    );
    res.send('Hello');
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
            res.send(error);
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
            res.send(error);
          }
        },
      );
    }
    res.send('success');
  } catch (err) {
    console.log(err);
  }
});

router.route('/coverimage').post(async (req, res) => {
  const userId = req.body.username;
  const coverImage = req.files.coverImage;

  console.log(req.body);
  console.log(req.files);

  var currentTimeInSeconds = Math.floor(Date.now() / 1000);

  const time = currentTimeInSeconds;

  const coverImagePath = coverImage.name;

  var coverImageHashLink = null;

  coverImage.mv(coverImagePath, async (err) => {
    try {
      const uploadHash = req.body.imageHash;

      const imageHash = req.files.coverImage.name;

      coverImageHashLink =
        'https://ipfs.io/ipfs/' + uploadHash + '/' + imageHash;

      fs.unlink(coverImagePath, (err) => {
        if (err) console.log(err);
      });

      if (coverImageHashLink != null) {
        User.findOneAndUpdate(
          { username: userId },
          { $set: { cover_image: coverImageHashLink } },
          function (error, success) {
            if (error) {
              res.send(error);
            }
          },
        );

        return res.send(coverImageHashLink);
      } else {
        return res.render('upload', { error: 'Error!' });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

router.route('/profileimage').post(async (req, res) => {
  const userId = req.body.username;
  const profileImage = req.files.profileImage;

  console.log(req.body);
  console.log(req.files);

  var currentTimeInSeconds = Math.floor(Date.now() / 1000);

  const time = currentTimeInSeconds;

  const profileImagePath = profileImage.name;

  var profileImageHashLink = null;

  profileImage.mv(profileImagePath, async (err) => {
    try {
      const uploadHash = req.body.imageHash;

      const imageHash = req.files.profileImage.name;

      profileImageHashLink =
        'https://ipfs.io/ipfs/' + uploadHash + '/' + imageHash;

      fs.unlink(profileImagePath, (err) => {
        if (err) console.log(err);
      });

      if (profileImageHashLink != null) {
        User.findOneAndUpdate(
          { username: userId },
          { $set: { profile_image: profileImageHashLink } },
          function (error, success) {
            if (error) {
              res.send(error);
            }
          },
        );

        return res.send(profileImageHashLink);
      } else {
        return res.render('upload', { error: 'Error!' });
      }

      if (err) {
        return res.status(500).send(err);
      }
    } catch (error) {
      console.log(error);
    }
  });
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
