import multer from "multer";

const tmpDir = './tmp';



const storage = multer.diskStorage({
  destination: './videos/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

export default upload