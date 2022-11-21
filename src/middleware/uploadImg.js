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

export const upload = multer({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
        if (typeArray.includes(file.mimetype)) return cb(null, true);
        return cb(new Error('extension is not valid', false));
    },
    limits: { fileSize: 8 * 1024 * 1024 },
}).single('image');
