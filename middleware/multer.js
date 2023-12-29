const multer = require("multer")
const path = require("path")

const allowedFileTypes = ['.jpg', '.jpeg', '.png'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/h');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    // Check if the file type is allowed
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(extname)) {
      return cb(null, true);
    } else {
      return cb(new Error('Invalid file type. Only JPG, JPEG and PNG files are allowed.'));
    }
  };

const upload = multer({ storage, fileFilter })

module.exports = upload.single('image');


// // Single file
// app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
//   console.log(req.file)
//   return res.send("Single file")
// })