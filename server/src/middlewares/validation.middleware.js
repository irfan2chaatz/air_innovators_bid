import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

function userRegisterValidation() {
    return [
        body("email").isEmail().withMessage("Invalid Email")
            .notEmpty().withMessage("Email is required"),
        body("password")
            .notEmpty().withMessage("Password is required"),
        body("username").isAlphanumeric()
            .notEmpty().withMessage("Username is required"),
        body("name").isAlpha().withMessage('First name should only contain letters')
            .notEmpty().withMessage("Name is required")
    ];
}

function userLoginValidation() {
    return [
        body("username")
            .notEmpty().withMessage("Username is required"),
        body("password")
            .notEmpty().withMessage("Password is required")
    ];
}

function changePasswordValidation() {
    return [
        body("password")
            .notEmpty().withMessage("Password is required"),
        body("newPassword")
            .notEmpty().withMessage("New password is required")
    ]
}

function handleValidationErrors(req, res, next) {
    const errorsResult = validationResult(req);
    if (errorsResult.isEmpty()) {
        return next();
    }

    throw new ApiError(400, "Validation Error", errorsResult.array())
}



export {
    handleValidationErrors,
    userRegisterValidation,
    changePasswordValidation,
    userLoginValidation
};