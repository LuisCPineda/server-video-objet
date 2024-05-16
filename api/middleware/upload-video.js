import multer from "multer";

const storage = multer.diskStorage({
  destination: "./videos",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

export default upload;
