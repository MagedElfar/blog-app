//import modules
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require("mongoose");
const config = require("dotenv").config();
const path = require("path");

//import routes
const auth = require("./routes/auth.js");
const user = require("./routes/user.js");
const post = require("./routes/post.js");
const category = require("./routes/category.js");

//server configuration
config;
const app = express();
const PORT = process.env.PORT || 3001;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(express.urlencoded({extended: true}) , express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
? process.env.WHITELISTED_DOMAINS.split(",")
: []

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },

    credentials: true,
}

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname , 'uploads')));
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     //cookie: { secure: true }
// }));
// app.use(passport.initialize());
// app.use(passport.session());
//require("./passport.js")(passport)

//api data configuration
app.use("/uploads" , express.static("uploads"));
app.get("/" , (req , res) => {res.send("blog app server side")})

//api routes
app.use("/auth" , auth);
app.use("/user" , user);
app.use("/post" , post);
app.use("/category" , category);

//error
app.use((err , req , res , next) =>{
    console.log(err)
    res.status(err.status || 500).json({
        massege: err.massege
    })
})

//start server and database conction
app.listen(PORT , () => {
    console.log(`server is runnig on PORT ${PORT}...`)
})

mongoose.connect(CONNECTION_URL , {
    useNewUrlParser: true ,
    useUnifiedTopology: true
}).then(() => {
    console.log("database is concted...")
}).catch((error) => {
    console.log("error:" , error.message)
});