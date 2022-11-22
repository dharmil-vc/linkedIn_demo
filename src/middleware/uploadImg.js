import multer from 'multer';
import path from 'path';

const uploadFilePath = path.join(path.resolve(), '/public');

const storageEngine = multer.diskStorage({
  destination: uploadFilePath,
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    req.savedFile = fileName;
    cb(null, fileName);
  },
});

const typeArray = ['image/jpeg', 'image/png', 'image/gif'];

const upload = multer({
  storage: storageEngine,
  fileFilter: (req, file, cb) => {
    if (typeArray.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Extension is not valid. Please upload with .png, .jpeg, .gif files only.', false));
  },
  limits: {
    fileSize: 8 * 1024 * 1024
  },
}).single('image');

export const multerUpload = (req, res, next) => {

  upload(req, res, async (error) => {
    if (error) {
      console.error("error of multer upload", error);
      res.status(415).send({
        message: error.message
      })
    } else {
      next();
    }
  })
}