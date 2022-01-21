const router = require("express").Router();
const post = require("./../controllers/post.js");
const validation = require("./../middleware/validation.js");
const multer = require("./../middleware/files.js")
const authorization = require("./../middleware/authorization.js");

//get all posts
router.get("/" , post.getPosts);

//get all user posts
router.get("/:id" , post.getPosts);


//get one post
router.get("/single/:slug" , post.getPost);

//add post
router.post("/add" , authorization , multer.uploader("posts") , validation.postValidation , validation.isValidat  , post.addPost);

//update post 
router.patch("/:id" , authorization , multer.uploader("posts") , validation.postValidation , validation.isValidat , post.updated );

//delete post
router.delete("/:id" , authorization , post.delete );

//review post
router.put("/review/:id" , authorization , post.review)

module.exports = router;