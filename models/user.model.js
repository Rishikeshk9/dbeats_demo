const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")

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
        wallet_id: { type: String, 
            trim: true, 
            default: null 
        },
        password: {
            type:String,
            default:false,
            required:true
        },
        confirm_password: {
            type:String,
            default:false,
            required:true
        },
        livepeer_data: {
            type: Object,
            required:true,
            default:false
        },
        subscribers:{
            type:Object,
            default:{},
        },
        subscribed :{
            type:Object,
            default:{},
        },
        tracks:{
            type:Object,
            default:{},
        },
        videos :{
            type:Object,
            default:{},
        },
        multistream_platform:{
            type:Array,
            default:[],
        },
        album_count: { type: Number, default: 0 },
        bio: { type: String, default: '', trim: true },
        cover_photo: { type: String, trim: true },
        followee_count: { type: Array, default: [] },
        follower_count: { type: Array, default: [] },
        is_verified: { type: Boolean, default: false },
        location: { type: String, trim: true, default: null },
        playlist_count: { type: Number, default: 0 },
        profile_picture: {
            type: String,
            trim: true,
            minlength: 3,
        },
        repost_count: { type: Number, default: 0 },
        track_count: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirm_password = await bcrypt.hash(this.confirm_password, 10);
    }

    next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;