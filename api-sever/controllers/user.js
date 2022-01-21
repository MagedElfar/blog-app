const User = require("./../model/User.js");
const Post = require("./../model/Post.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const slugify = require("slugify");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const dev = process.env.NODE_ENV !== "production"

dotenv.config();

const COOKIE_OPTIONS = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: true,
    signed: true,
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    sameSite: "none",
}

//refreshToken
exports.refreshToken = (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies;

    //console.log("refreshToken:" , refreshToken)
    

    if (refreshToken) {
    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const userId = payload.id;
        
        User.findOne({ _id: userId }).then(
            user => {
        if (user) {
        // Find the refresh token against the user record in database
        const tokenIndex = user.refreshToken.findIndex(
            item => {
                return item.refreshToken == refreshToken
            }
        )

        if (tokenIndex === -1) {
            res.statusCode = 401
            res.send("Unauthorized")
        } else {
            const token = jwt.sign({id: userId} , process.env.TOKEN_SECRET , {expiresIn: eval(process.env.SESSION_EXPIRY)} );
            // If the refresh token exists, then create new one and replace it.
            const newRefreshToken = jwt.sign({id:userId }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY)} )

            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
            user.save((err, user) => {
            if (err) {
                res.statusCode = 500
                res.send(err)
            } else {
                const {password:pass , ...others} = user
                res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                res.send({ success: true, token , user })
            }
            })
        }
        } else {
        res.statusCode = 401
        res.send("Unauthorized")
        }
    },
    err => next(err))
    } catch (err) {
        res.statusCode = 401
        res.send("Unauthorized")
    }
    } else {
        res.statusCode = 401
        res.send("Unauthorized")
    }
}

//logout
exports.logout = (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies;
    
    User.findById(req.userId).then(
    user => {
    const tokenIndex = user.refreshToken.findIndex(
        item => item.refreshToken === refreshToken
    )

    if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
    }

    user.save((err, user) => {
        if (err) {
            res.statusCode = 500
            res.send(err)
        } else {
            res.clearCookie("refreshToken", COOKIE_OPTIONS)
            res.send({ success: true })
        }
    })
    },
    err => next(err)
    )
}

//singup & creat user
exports.creatUser = async(req , res) => {
    try {
        const body = req.body;

        //creat user slug
        body.slug = slugify(body.username)

        //check if user is exsist
        let user = await User.findOne({username: body.username});
        if (user) {
            throw ({status:403 , message : 'user is already exsist'});
        };
        
        //hashed password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password , salt);
        if(!hash) throw ({status:408 , message : 'there is error with create password'});
        body.password = hash;

        //create user
        const newUser = new User(body);

        user = await newUser.save();

        const refreshToken = jwt.sign({id: user._id} , process.env.REFRESH_TOKEN_SECRET, {expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY)} )

        newUser.refreshToken.push({ refreshToken });

        user = await User.findByIdAndUpdate(user._id , user , {new: true})

        //create token
        const token = jwt.sign({id: user._id}  , process.env.TOKEN_SECRET , {expiresIn: eval(process.env.SESSION_EXPIRY)});

        const {password:pass , ...others} = user._doc

        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
        res.send({ success: true, token , user: others })

        //send mail
        // let mailTransporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         type: "OAuth2",
        //         user: process.env.EMAIL,
        //         pass: process.env.EMAILPASS,
        //         clientId: process.env.OAUTH_CLIENTID,
        //         clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        //     }
        // });

        // let mailDetails = {
        //     from: process.env.EMAIL,
        //     to: user.email,
        //     subject: 'success registration',
        //     text: `welcome ${user.username} thenk you for your registration`
        // };

        // mailTransporter.sendMail(mailDetails, function(err, data) {
        //     if(err) {
        //         console.log(err.message);
        //     } else {
        //         console.log('Email sent successfully');
        //     }
        // });

        // //api response
        // res.status(201).json({
        //     message: "user is created",
        //     result: others , 
        //     token
        // })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//login
//exports.login = passport.authenticate("local-login")
exports.login = async (req , res) => {
    try {
        const {email , password} = req.body;

        //check email
        let user = await User.findOne({email})
        if(!user) throw ({status:401 , message : 'invalid email'});

        //check password
        let same = await bcrypt.compare(password , user.password);
        if(!same) throw ({status:401 , message : 'invalid password'});

        const {password:pass , ...others} = user._doc;

        //create token
        const token = jwt.sign({id: user._id} , process.env.TOKEN_SECRET , {expiresIn: "15m"} );

        const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY)} )

        user.refreshToken.push({ refreshToken });

        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)

        user = await User.findByIdAndUpdate(user._id , user , {new: true})

        //api response
        res.status(200).json({
                message: "login is succeed",
                token,
                user:others
        })

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//update user 
exports.updated = async (req , res) => {
    try {
        const {id} = req.params;
        const body = req.body;
        delete body.password;

        //update user slug
        body.slug = slugify(body.username)

        //check id id is valied
        if(!mongoose.Types.ObjectId.isValid(id)) throw ({status:401 , message : 'invalid user id'});

        //check is there any file
        if(req.file?.filename){
            body.image = req.file.filename;
        }

        //update user
        const user = await User.findByIdAndUpdate(id , body , {new: true});

        const {password:pass , ...others} = user._doc;

        //api response
        res.status(200).json({
            message: "user is updated",
            result: others , 
        })

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//delete user 
exports.delete = async (req , res) => {
    try {
        const {id} = req.params;

        //check id id is valied
        if(!mongoose.Types.ObjectId.isValid(id)) throw ({status:401 , message : 'invalid user id'});

        //delete user
        await User.findByIdAndDelete(id);

        //delete user posts
        await Post.deleteMany({author: id});

        //api response
        res.status(200).json({ message: "user is deleted" })

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}