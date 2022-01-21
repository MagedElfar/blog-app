const router = require("express").Router();
const user = require("./../controllers/user.js");
const validation = require("../middleware/validation.js");
const authorization = require("./../middleware/authorization.js");

//singup router
router.post("/singup" , validation.userValidation , validation.isValidat , user.creatUser);

//login
router.post("/login" , user.login)

//refreshToken
router.post("/refreshtoken" , user.refreshToken);

//logout
router.get("/logout", authorization , user.logout)


module.exports = router;