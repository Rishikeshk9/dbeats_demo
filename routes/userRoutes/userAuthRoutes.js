const router = require('express').Router();
const Str = require('@supercharge/strings');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

let User = require('../../models/user.model');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  }),
);

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const walletID = req.body.wallet_id;
  const fullName = req.body.name;
  const userName = req.body.username;
  const userEmail = req.body.email;
  const livepeerData = req.body.livepeer_data;
  const password = req.body.password;
  const confirmPassword = req.body.confirm_password;
  const userId = Str.random(5);

  const newUser = new User({
    username: userName,
    id: userId,
    name: fullName,
    email: userEmail,
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
      const token = await user_username.generateAuthToken();
      let loginData = {
        username: user_username,
        jwtToken: token,
      };
      res.send(loginData);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).send('Invalid Login');
  }
});

router.route('/reset_password').post(async (req, res) => {
  try {
    const email = req.body.email;

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString('hex');

      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(422)
          .json({ error: 'User dont exists with that email' });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: process.env.SERVICE_EMAIL,
          subject: 'password reset',
          html: `
                <p>You requested for password reset</p>
                <h5>click in this <a href="${process.env.SITE_URL}/reset/${token}">link</a> to reset password</h5>
                `,
        });
        res.json({ message: 'check your email' });
      });
    });
  } catch (error) {
    res.status(400).send('Invalid Login');
  }
});

router.route('/new_password').post(async (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;

  const user = await User.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  });
  if (!user) {
    return res
      .status(422)
      .json({ error: 'Try again session expired' });
  }
  bcrypt
    .hash(newPassword, 10)
    .then((hashedpassword) => {
      user.password = hashedpassword;
      user.resetToken = undefined;
      user.expireToken = undefined;
      user.save().then((saveduser) => {
        res.json({ message: 'password updated success' });
      });
    })
    .catch((err) => {
      console.log(err);
    });
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

router.route('/coverimage').post(async (req, res) => {
  const userId = req.body.username;
  const coverImage = req.files.coverImage;

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

module.exports = router;
