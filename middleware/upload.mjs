import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
      },
      filename: (req, file, cb) => {
        cb(null, Math.floor(1000 + Math.random() * 9000)
        + '-' + file.originalname); 
      },

  });
  
 export const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, 
    fileFilter: function (req, file, cb) {
      const fileTypes = /jpeg|jpg|png/;
      const mimeType = fileTypes.test(file.mimetype);
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimeType && extName) {
        return cb(null, true);
      } else {
        cb(new Error('Only upload JPEG and png images'));
      }
    }
  });