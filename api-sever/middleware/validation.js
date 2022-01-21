const expressValidator = require("express-validator");

//user validation
exports.userValidation = [
    expressValidator.check("username").not().isEmpty().withMessage("username is required"),
    expressValidator.check("email").not().isEmpty().withMessage("email is required"),
    expressValidator.check("email").isEmail().withMessage("invalid email"),
    expressValidator.check('password').isLength({min: 6}).withMessage('password must be 6 character at least')
]

//post validation
exports.postValidation = [
    expressValidator.check("title").not().isEmpty().withMessage("post title is required")
]

//category validation
exports.categoryValidation = [
    expressValidator.check("name").not().isEmpty().withMessage("category name is required")
]

//check validation
exports.isValidat = (req , res , next) => {
    try {
        
        if(expressValidator.validationResult(req).isEmpty()) {
            next()
        } else {
            const errors = expressValidator.validationResult(req).array().map(item => item.msg)
            throw ({status:409 , message : errors});
        }
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}
