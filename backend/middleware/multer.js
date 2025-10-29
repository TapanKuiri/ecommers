import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
})

const fileFilter = (req, file, callback)=>{
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', "image/webp", 'image/gif'];
    if(allowedTypes.includes(file.mimetype)){
        callback(null, true);
    }else{
        callback(new Error("Only image file is allowed!"), false);
    }
}

const upload = multer({storage,
    limits: {fileSize: 1 * 2024 * 2024 },
    fileFilter, // 1 MB
});
export default upload;