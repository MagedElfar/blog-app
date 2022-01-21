const mongoose = require("mongoose");

const Session = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    slug:{
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "autor",
        trim: true
    },
    image: {
        type:String,
        default: 'avatar.png',
        trim: true
    },
    refreshToken: {
        type: [Session],
    },
} , {timestamps: true});

UserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    },
  })

module.exports = mongoose.model("user" , UserSchema);

