import express from "express";
import { registerUser, loginUser, changePassword, userLogout, uploadProductPic, verifyEmail, validateToken, getUserDetails, updateProfile } from '../controllers/user.controller.js'
import verifyToken from "../middlewares/verifyToken.middleware.js";
import { handleValidationErrors, userRegisterValidation, userLoginValidation, changePasswordValidation }
  from "../middlewares/validation.middleware.js"
import multerUpload from '../middlewares/multer.middleware.js'



// Add a neccessary express validations
const router = express.Router()

/*
  API Endpoint:  /api/user/register
*/
router.post("/register",
  userRegisterValidation(),
  handleValidationErrors,
  registerUser)


/*
  API Endpoint:  /api/user/login
*/
router.post("/login",
  userLoginValidation(),
  handleValidationErrors,
  loginUser)


/*
  API Endpoint:  /api/user/changepassword
*/
router.post("/changepassword",
  verifyToken,
  changePasswordValidation(),
  handleValidationErrors,
  changePassword)

/*
  API Endpoint:  /api/user/updateprofile
*/
router.post("/updateprofile",
  verifyToken,
  handleValidationErrors,
  updateProfile)


router.get("/logout",
  verifyToken,
  userLogout)

/*
  API Endpoint:  /api/user/details/:username
*/
router.get("/details/:username",
  verifyToken,
  getUserDetails
)

router.post("/auth/validate", validateToken)

//email verification
router.get("/verify-email/:token", verifyEmail)


router.post("/uploadproductpic",
  verifyToken,
  multerUpload.single('product'),
  uploadProductPic
)

export default router;