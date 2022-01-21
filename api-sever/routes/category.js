const router = require("express").Router();
const {addCategory , getCategories} = require("./../controllers/category.js");
const validation = require("./../middleware/validation.js");
const authorization = require("./../middleware/authorization.js");

//get all posts
router.get("/" , getCategories);

// //get one post
// router.get("/:id" , post.getPost);

//add post
router.post("/add" , authorization , validation.categoryValidation , validation.isValidat , addCategory );

// //update post 
// router.patch("/:id" , authorization  , validation.postValidation , validation.isValidat , multer.uploader("users") , post.updated );

// //delete post
// router.delete("/:id" , authorization , post.delete );

module.exports = router;