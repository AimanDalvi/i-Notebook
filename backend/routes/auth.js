const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
var fetchuser = require ('../middleware/fetchuser');

const JWT_SECRET = 'dsamakesyoustandout';

//create a new user using localhost:5000/api/auth/createuser endpoint.
router.post("/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5}),
  ],
  async (req, res) => {
    success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    //check a user is there or not using email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry a user with this email already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      secPass =  await bcrypt.hash( req.body.password, salt)

    //create a user using req body
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user:{id: user.id}
      }
      const authtoken = jwt.sign(data, JWT_SECRET);//ye authtoken se hamko pata chal jayga ki knsa user login ha qki token me user ki id ha or usko sign krdiye ha ek secret se jisse tamperng pakad lenge ot jab bhi bhi login krega user to token ko verify krlege neeche jisse nots konse user k ha wo bhi pata chal jayga 

      success = true;
      res.json({success,authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Authenticate a new user using localhost:5000/api/auth/lohgin endpoint.

router.post("/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {email, password} = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res.status(400).json({ success,error: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success=false
        return res.status(400).json({success, error: "please try to login with correct credentials" });
      }

      const data = {
        user:{id:user.id}
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,authtoken});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Get details of logged in user using localhost:5000/api/auth/getuser endpoint.login required

router.post('/getuser', fetchuser, async (req, res) => {
    
    try {
      userId= req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }


  }
);


module.exports = router;
