const jwt = require('jsonwebtoken');

async function validateToken(
    req,
    res,
    next
  ){
    try {

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if(authHeader && authHeader.startsWith("Bearer")){
       token = authHeader.split(" ")[1];
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err){
            res.status(401).json({ err: "User is not authorized"});
        }
        req.user = decoded.user;
       });

       next();

    }
     if(!token){
       res.status(401).json({ err: "User is not authorized or token is missing"});
     }
    
    } catch (e) {
      return res.status(400).send(e);
    }
  };

  module.exports = validateToken