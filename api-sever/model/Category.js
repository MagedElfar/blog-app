const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        lowercase: true,
        trim: true,
        required: true
    },
    slug:{
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true
    }
} , {timestamps: true});

module.exports = mongoose.model("category" , categorySchema);

