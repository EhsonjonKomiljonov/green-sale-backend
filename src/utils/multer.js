import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/public');
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname;
    fileName = fileName.replace(/\s/g, '');
    const uniqueSuffix = Date.now() + fileName;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage });
