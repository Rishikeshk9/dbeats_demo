const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    jwt_token: {
      type: String,
    },
    resetToken: String,
    expireToken: Date,
    wallet_id: { type: String, trim: true, default: null },
    password: {
      type: String,
      default: false,
      required: true,
    },
    cover_image: {
      type: String,
      default: '',
    },
    profile_image: {
      type: String,
      default: '',
    },
    livepeer_data: {
      type: Object,
      required: true,
      default: false,
    },
    tracks: {
      type: Object,
      default: {},
    },
    videos: {
      type: Object,
      default: {},
    },
    multistream_platform: {
      type: Array,
      default: [],
    },
    pinned: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    notification: {
      type: Array,
      default: [],
    },
    oldnotification: {
      type: Array,
      default: [],
    },
    your_reactions: {
      type: Array,
      default: [],
    },
    my_playlists: {
      type: Array,
      default: [],
    },
    album_count: { type: Number, default: 0 },
    bio: { type: String, default: '', trim: true },
    followee_count: { type: Array, default: [] },
    follower_count: { type: Array, default: [] },
    favorite_tracks: { type: Array, default: [] },
    is_verified: { type: Boolean, default: false },
    location: { type: String, trim: true, default: null },
    playlist_count: { type: Number, default: 0 },
    repost_count: { type: Number, default: 0 },
    track_count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      'mynameissahilpunjabicomputerengineer',
    );
    this.jwt_token = token;
    await this.save();
    return token;
  } catch (error) {
    console.log('error is' + error);
    res.send('error is' + error);
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
