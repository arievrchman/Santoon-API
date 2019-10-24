const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

exports.upload = multer({ storage });