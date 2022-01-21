const Post = require("./../model/Post.js");
const User = require("./../model/User.js");
const Category = require("./../model/Category.js")
const slugify = require("slugify");
const mongoose = require("mongoose");

//get all posts
exports.getPosts = async (req , res) => {
    const {author , cat , page} = req.query 

    try {

        let posts;
        let count = 0

        if(author) {
            const user = await User.findOne({username: author });
            count = await Post.countDocuments({username: author })
            console.log(count)
            posts = await Post.find({author : user._id.toString()} , {} , {
                sort: {createdAt : -1}
            }).skip((page-1)*4).limit(4).populate("author").populate("category");            
        } else if(cat) {
            const category = await Category.findOne({name: cat });
            count = await Post.countDocuments({category : {
                $in: category._id.toString()
            }})
            console.log(count)
            posts = await Post.find({category : {
                $in: category._id.toString()
            }} , {} , {
                sort: {createdAt : -1}
            }).skip((page-1)*4).limit(4).populate("author").populate("category");
            
        } else if(page) {
            count = await Post.countDocuments()
            posts = await Post.find({} , {} , {
                sort: {createdAt : -1}
            }).skip((page-1)*4).limit(4).populate("author").populate("category");
            
        } else {
            posts = await Post.find({} , {} , {
                sort: {createdAt : -1}
            }).limit(4).populate("author").populate("author").populate("category").populate("reviews.user");
            // posts = await Post.aggregate([
            //     {
            //         $project: {_id:0 , title: 1 , "reviews.rating": 1}
            //     },
            //     {
            //         $group: {
            //             _id: {
            //                 title: "$title",

            //             }
            //         }
            //     }
            // ])
        }

        count = Math.ceil(count / 4)

        // const reviewDatail = await Post.aggregate([
        //     {
        //         $project: {_id:0 , title: 1 , "reviews.rating": 1}
        //     },
        //     {$unwind:"$reviews"},
        //     {$group: { _id: {
        //         title: "$title",
        //         rating:'$reviews.rating'
        //     } ,
        //     count: { $sum: 1 } } },
        //     {$group: { 
        //         _id: "$_id.title",
        //         reviwe: { 
        //             $push: {
        //                 rate:"$_id.rating",
        //                 count: "$count"
        //             }
        //          } 
        //     } }
            
        // ])

        // const reviewDatail = await Post.aggregate([
        //         {
        //             $project: {_id:0 , title: 1 , "reviews.comment": 1 , }
        //         }
        // ])

        res.status(200).json({
            result: posts,
            count
            //reviewDatail
        }) 
        
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//get post by slug
exports.getPost = exports.updated = async (req , res) => {
    try {
        const {slug} = req.params;

        // //check id id is valied
        // if(!mongoose.Types.ObjectId.isValid(id)) throw ({status:404 , message : 'post not found'});

        //get post
        const post = await Post.findOne({slug}).populate("author").populate("category").populate("reviews.user");


        //check is post
        if(!post) throw ({status:404 , message : 'post not found'});

        //api response
        res.status(200).json({
            result: post
        })

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//add new post
exports.addPost = async(req , res) => {
    try {
        const userId = req.userId;
        const body = req.body;

        body.author = userId
        //creat user slug
        body.slug = slugify(body.title)

        //convert category
        body.category = JSON.parse(body.category)

        //check is there any file
        if(req.file?.filename){
            body.image = req.file.filename;
        }


        //create post
        const newPost = new Post(body);
        let post = await newPost.save();

        post = await Post.findById(post._id).populate("author").populate("category").populate("reviews.user");


        //api response
        res.status(201).json({
            message: "post is added",
            result: post , 
        })

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//update post 
exports.updated = async (req , res) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const userId = req.userId;

        let post = await Post.findById(id);

        //check user
        if(userId !== post.author) throw ({status:403 , message : 'permission denied'});

        //convert category
        body.category = JSON.parse(body.category)

        //update post slug
        body.slug = slugify(body.title)

        // //check id is valied
        //if(!mongoose.Types.ObjectId.isValid(id)) throw ({status:404 , message : 'post id is invalid'});

        //check is there any file
        if(req.file?.filename){
            body.image = req.file.filename;
        }

        //update post
        post = await Post.findByIdAndUpdate(id , body , {new: true}).populate("author").populate("category").populate("reviews.user");

        //api response
        res.status(200).json({
            message: "post is updated",
            result: post 
        })

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//delete post 
exports.delete = async (req , res) => {
    try {
        const {id} = req.params;
        const userId = req.userId;

        console.log(id)

        //check id id is valied
        if(!mongoose.Types.ObjectId.isValid(id)) throw ({status:401 , message : 'post id is invalid'});

        const post = await Post.findById(id);

        if(!post) throw ({status:404 , message : 'post is not found'});

        if(userId !== post.author) throw ({status:403  , message : 'permission denied'});

        //delete user
        await Post.findByIdAndDelete(id);

        //api response
        res.status(200).json({ message: "post is deleted" })
        

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//post review
exports.review = async (req , res) => {
    try {
        const userId = req.userId;
        const {id} = req.params;
        const body = req.body;

        //get post
        let post = await Post.findById(id);

        let {reviews} = post

        //check if user reviewed before
        const index = reviews.findIndex( item => item.user == userId);

        if(index > -1){
            //update review is user already reviewed

            body.user = userId

            post = await Post.findOneAndUpdate({"_id":id , "reviews.user": mongoose.Types.ObjectId(userId)} , {
                $set:{
                    "reviews.$": body,
                    
                }
            } , {new:true});

            const totalRate = post.reviews.reduce((sum , item) => {
                return sum + item.rating
            } , 0)
    
            post.rating = totalRate / post.reviews.length
    

        } else {
            console.log(index)
            //add review if user didn't review used
            reviews.push({
                user: userId,
                ...body
            })

            const totalRate = reviews.reduce((sum , item) => {
                return sum + item.rating
            } , 0)
    
            post.rating = totalRate / reviews.length
    
        }

        const reviewDatail = await Post.aggregate([
            {$unwind:"$reviews"},
            {$group: { _id: '$reviews.rating' , count: { $sum: 1 } } }
        ])

        post.reviewDatail = reviewDatail.sort((d1, d2) => d2._id - d1._id);

        post = await Post.findByIdAndUpdate(id , post , {new:true}).populate("author").populate("category").populate("reviews.user");

        //api response
        res.status(200).json({ result: post })
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}