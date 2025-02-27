import jwt from "jsonwebtoken";
import userModel from "../Model/userModel.js";

// function authenticateUser(req, res, next){
//     const token= req.headers.authorization?.split(' ')[1];

//     if(!token){
//         return res.status(401).json({message: 'Unauthorized: No token provided'});
//     }

//     try{
//         const decoded= jwt.verify(token, process.env.JWT_SECRET);
//         req.user=decoded;
//         next();
//     }catch(error){
//         res.status(401).json({message: 'Unauthorized: Invalid token'});
//     }
// };

function authenticateUser(req, res, next){
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]=== "JWT"){
        jwt.verify(
            req.headers.authorization.split(" ")[1], 
            process.env.JWT_SECRET, 
            function(err, verifiedToken){
                if(err){
                    return res.status(403).json({message: "Invalid JWT token"})
                }
                userModel.findById(verifiedToken._id).then((user)=>{
                    req.user= user; 
                    next();
                }).catch(err=> res.status(500).json({message: err.message}))
            }
        );
    }
}

export default authenticateUser;