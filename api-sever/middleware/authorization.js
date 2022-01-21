const jwt = require('jsonwebtoken');
require("dotenv").config();

const authorization = (req , res , next) => {
    try{
        if(req.headers?.authorization){
            const token = req.headers.authorization.split(' ')[1] || "null";
            if(token){
                jwt.verify(token , process.env.TOKEN_SECRET , (error , decodedData) => {
                    if(error) throw({message: `invalid token`});
                    console.log(decodedData)
                    req.userId = decodedData?.id;
                });
            }
            next();
        } else {
            throw({message: `permission denied`});
        }
    } catch(error){
        res.status(401).json({message: error.message})
    }
}

module.exports = authorization;