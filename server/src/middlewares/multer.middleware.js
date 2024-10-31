import multer from 'multer'
import { ApiError } from '../utils/ApiError.js'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/' + file.fieldname + '/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const mediaExt = file.originalname.split('.')[1]
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + mediaExt)
    }
})

// File filter to allow only images
const fileFilter = function (req, file, cb) {

    const fileType = file.mimetype.split("/")[0]; // Check MIME type

    if (fileType == "image") {
        cb(null, true); // Accept the file
    } else {
        cb(new ApiError(415, "Invalid file type. Only images are allowed!"), false); // Reject the file
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter })


export default upload