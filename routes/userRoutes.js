const router = require("express").Router();
const Str = require("@supercharge/strings");
const bcrypt = require("bcryptjs");

let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

  const walletID = req.body.wallet_id;
  const fullName = req.body.name;
  const userName = req.body.username;
  const livepeerData = req.body.livepeer_data;
  const password = req.body.password;
  const confirmPassword = req.body.confirm_password;
  const userId = Str.random(5);


  const newUser = new User({
    username: userName,
    id: userId,
    name: fullName,
    wallet_id: walletID,
    livepeer_data:livepeerData,
    password:password,
    confirm_password:confirmPassword
  });

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => {
      //console.log(err);
      res.status(400).json("Error: " + err)});
});

router.route("/login").post( async (req,res)=>{
  try{
      const username = req.body.username;
      const password = req.body.password;

      const user_username = await User.findOne({username:username});
      const isMatch = bcrypt.compare(password, user_username.password);

      if(isMatch){ 
          res.send(user_username);
      }else{
          res.send(false);
      }
    }
  catch(error){
      res.status(400).send("Invalid Login");
  }
})

router.route("/subscribe").post( async (req,res)=>{
  try{
    const subscriberName = req.body.name;
    const subscriberUsername = req.body.username;
    const toSubscribeName = req.body.video_name;
    const toSubscribeUsername = req.body.video_username;
    
    const subscribers = {
      name:toSubscribeName, username: toSubscribeUsername,
    };

    User.findOneAndUpdate(
      {username:subscriberUsername }, 
      { $push: { subscribers: subscribers} },
     function (error, success) {
           if (error) {
               console.log(error);
           } else {
               console.log(success);
           }
        });

        const subscribed = {
        name:subscriberName, username: subscriberUsername,
      };
  
      User.findOneAndUpdate(
        {username: toSubscribeUsername }, 
        { $push: { subscribed: subscribed} },
        function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
             }
        });
  }
  catch(err){
    res.send("Try Again");
  }
})

router.route("/:username").get( async (req,res)=>{
  try{
    const getuserData = req.params.username;
    
    const userData=await User.findOne({username:getuserData });
    res.send(userData)
  }
  catch(err){
    res.send("Try Again");
  }
})

router.route("/get_user_by_id/:streamID").get( async (req,res)=>{
  try{
    const stream_id = req.params.streamID;

    const userData=await User.findOne({'livepeer_data.id':stream_id });
    res.send(userData)
  }
  catch(err){
    res.send("Try Again");
  }
})

router.route("/getuser_by_wallet/:walletId").get( async (req,res)=>{
  try{
    const wallet_id = req.params.walletId;

    const userData=await User.findOne({'wallet_id':wallet_id });
    res.send(userData)
  }
  catch(err){
    //console.log(err)
    res.send("Try Again");
  }
})


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