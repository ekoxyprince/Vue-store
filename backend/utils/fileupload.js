import multer, { diskStorage } from "multer";

const fileStorageEngine = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

export default multer({ storage: fileStorageEngine });
