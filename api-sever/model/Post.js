const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: { type: Number},
    comment: { type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    date: {type:Date , default: Date.now()}
});

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique:true,
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
    content:{
        type:String,
        lowercase: true,
        trim: true
    },
    author:{
        type:String,
        required:true,
        ref: "user",
        trim: true
    },
    image:{
        type:String,
        default:"dummy-image-square.jpg",
        trim: true
    },
    category:[{
        type: [String],
        ref: "category",
        trim: true
    }],
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    reviewDatail: [
        { 
            _id: Number,
            count: Number
        }
    ]
} , {timestamps: true});

module.exports = mongoose.model("post" , postSchema);

