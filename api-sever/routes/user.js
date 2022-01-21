const router = require("express").Router();
const user = require("./../controllers/user.js");
const validation = require("./../middleware/validation.js");
const multer = require("./../middleware/files.js")
const authorization = require("./../middleware/authorization.js");

//update user 
router.patch("/:id" , authorization , multer.uploader("users") , validation.userValidation , validation.isValidat , user.updated )

//delete user
router.delete("/:id" , authorization , user.delete );

module.exports = router;