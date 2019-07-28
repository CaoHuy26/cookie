// Upload file
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/').slice(1)
        cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
    }
});
const upload = multer({storage: storage});

module.exports = upload;