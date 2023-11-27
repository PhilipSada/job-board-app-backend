const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobModel = require("../models/job");

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {

    if(!name || !email || !password){
        res.status(400).json({ message: "All fields are mandatory"});
    }

    const existingUser =  await UserModel.findOne({ email });

    if(existingUser){
        res.status(400).json({ message: "User already registered"});
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDocument = new UserModel({
      name,
      email,
      password:hashedPassword,
    });

    await userDocument.save();

    const accessToken = jwt.sign({
        user:{
            name,
            email,
            id: userDocument.id
        }
       }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"24h"}
       
    )

    res.status(200).json({user: userDocument,accessToken:accessToken});


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    
    try {

        if(!email || !password){
            res.status(400).json({ message: "All fields are mandatory"});
        }
        
        const user =  await UserModel.findOne({ email });

     

        if(user && (await bcrypt.compare(password, user.password))){
      
           const accessToken = jwt.sign({
            user:{
                name:user.name,
                email: user.email,
                id: user.id
            }
           }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"24h"}
           
           )


           res.status(200).json({user, accessToken});
        }else{
            res.status(401).json({ message: "Invalid Credentials"});
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
}

async function currentUser (req, res){
  try {
    const user = req.user;
    // const jobs = await JobModel.find({postedBy:req.user.id});
    const jobs = await JobModel.find({postedBy:user.id});
    
    if(!jobs){
      res.status(400).json({ message: "No jobs avaliable"});
    }

    // res.json({user, jobs});
    user.jobs = jobs;
    res.json({user});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = {registerUser, loginUser, currentUser}