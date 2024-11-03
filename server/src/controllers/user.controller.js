import fs from "node:fs/promises";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import CONFIG from "../config/config.js";
import { sendMail, emailVerificationMailgenContent } from "../utils/mail.js";
import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const registerUser = asyncHandler(async (req, res) => {
    let { email, username, password, name } = req.body;

    console.log("received : ", req.body);


    if (userFound) {
        throw new ApiError(409, "User already registered");
    }

    await prisma.user.create({
        data: {
          name,
          username,
          email,
          password
        },
    });


    res.status(200).json(new ApiResponse(200, "Register success"));

    sendMail({
        subject: "AIR INNOVATORS: Email Verification",
        email,
        mailgenContent: emailVerificationMailgenContent(
            username,
            `${CONFIG.REACT_BASE_URL}/verify-email/${tempUser.emailVerificationToken}` //client url
        ),
    });
});

const loginUser = asyncHandler(async (req, res) => {
    console.log("this is cookie", req.cookies);
    // username and password from the body and check if it exists
    // if there then fine, generate the token with _id as a payload and send response
    // if user doeesn't exist throw user


    let cookieOptions = {
        // Security options in Cookies
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 day
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 day from now
        path: "/", // the cookie is available for all routes on the domain
        httpOnly: false, // Restricts the cookie to HTTP/HTTPS calls only,
        // preventing client-side JavaScript from accessing the cookie
        // domain: 'example.com'
        // encode:     (value) => customEncodingFunction(value)
        secure: false, // Only transmitted over HTTPS, if set to 'true'
        sameSite: "Lax", // Control cross-site request behavior
        signed: false, // if the cookie should be signed using the
        // secret provided when setting up the cookie-parser middleware
    };

    let user = {
        name: userFound.name,
        email: userFound.email,
        username: userFound.username,
        isEmailVerified: userFound.isEmailVerified,
        profileImg: userFound.profileImg,
        coverImg: userFound.coverImg,
        bio: userFound.bio,
    };

    res
        .status(201)
        // .cookie("token", token, cookieOptions)
        .cookie("token", token)
        .json(
            new ApiResponse(201, "User logged in Successfully", { token, ...user })
        );
});

const changePassword = asyncHandler(async (req, res) => {
    let { userId } = req.payload;
    let { password, newPassword } = req.body;


    res
        .status(200)
        .json(new ApiResponse(201, "Password changed successfully ..."));
});

const updateProfile = asyncHandler(async (req, res) => {
    let { userId } = req.payload;
    const { name, bio } = req.body || {};


    res
        .status(200)
        .json(new ApiResponse(201, "Profile updated successfully ...", userFound));
});

const userLogout = asyncHandler(async (req, res) => {
    let { userId } = req.payload;


    res
        .clearCookie("token")
        .status(200)
        .json(new ApiResponse(200, "Logout Successfull"));
});

// get all the user details by username
const getUserDetails = asyncHandler(async (req, res) => {
    let { userId } = req.payload;
    let { username } = req.params;


    res
        .status(200)
        .json(new ApiResponse(200, "User found successfull", userDetails));
});

const uploadProductPic = asyncHandler(async (req, res) => {
    let { userId } = req.payload;

    // Get the new profile URL (static and local)
    let newProfileUrl = getStaticFilePath(req);
    let newProfileLocalPath = getLocalPath(req.file.filename, req.file.fieldname);

    // Delete the old profile image file from the server
    let oldProfileImg = userFound.profileLocalPath; // Save old profile image URL for deletion later

    // Update user's profile image in DB

    // Delete the old file directly
    if (oldProfileImg) {
        await fs.unlink(oldProfileImg);
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, "Image Upload Successful", newProfileUrl)
        );
});

const verifyEmail = asyncHandler(async (req, res) => {
    let { token } = req.params;


    userFound.isEmailVerified = true;
    userFound.emailVerificationToken = null;

    await userFound.save();

    res.status(200).json(new ApiResponse(200, "Email Verified"));
});

const validateToken = asyncHandler(async (req, res) => {
    let { token } = req.body;

    if (!token) {
        throw new ApiError(401, "Token is required");
    }

    let decoded = jwt.verify(token, CONFIG.JWT_SECRET_KEY);

    // user exists or not

    res.status(200).json(new ApiResponse(200, "Token is valid", userFound));
});

export {
    registerUser,
    loginUser,
    getUserDetails,
    updateProfile,
    changePassword,
    userLogout,
    uploadProductPic,
    verifyEmail,
    validateToken,
};
