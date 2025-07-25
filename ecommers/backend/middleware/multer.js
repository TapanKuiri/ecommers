import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
})

const upload = multer({storage});
export default upload;

// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, callback)  {
//     callback(null, "uploads/"); // make sure this folder exists
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname); // or use a unique name here
//   }
// });

// const upload = multer({ storage });

// export default upload;
