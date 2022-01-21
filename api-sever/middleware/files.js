const multer = require("multer");

//creat storage
module.exports.uploader = (dir) => {
    const storage = multer.diskStorage({
        destination: function (req , file , cb){
            cb(null , `uploads/${dir}`);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null , `${uniqueSuffix}-${file.originalname}`)
        }
    });

    return  multer({storage : storage }).single("image");
}