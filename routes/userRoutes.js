const router = require("express").Router();
const Str = require("@supercharge/strings");

let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
console.log(req.body);

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
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post( async (req,res)=>{
  try{
      const username = req.body.username;
      const password = req.body.password;

      const user_username = await User.findOne({username:username});
      //const isMatch = bcrypt.compare(password, useremail.password);

      //const token = await useremail.generateAuthToken();
      //console.log("token is " + token);

      console.log(user_username);
      if(user_username.password === password){
          res.send(user_username);
      }else{
          res.send(false);
      }
    }
  catch(error){
      res.status(400).send("Invalid Login");
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