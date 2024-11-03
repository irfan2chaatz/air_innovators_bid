import fs from "node:fs/promises";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import productModel from "../models/product.model.js";


const createProduct = asyncHandler(async (req, res) => {
    let { title, description, startingBid, endAt } = req.body;
    const { userId } = req.payload;

    let userFound = await userModel
        .findById(userId)
        .select("_id username role");

    if (!userFound) {
        throw new ApiError(401, "User not found");
    }
    
    // Check if the user's role is "ADMIN"
    if (userFound.role !== "ADMIN") {
        throw new ApiError(403, "Permission denied: Admin access required.");
    }

    let tempProduct = {
        title,
        description,
        startingBid,
        bids,
        userId,
        endAt
    };

    // method 1
    // await userModel.create(tempUser)

    // method 2
    let savedProduct = new productModel(tempProduct);
    await savedProduct.save();




    res.status(200).json(new ApiResponse(200, "Product created successfully ..."));
});

const deleteProduct = asyncHandler(async (req, res) => {
    console.log("this is cookie", req.cookies);
    // username and password from the body and check if it exists
    // if there then fine, generate the token with _id as a payload and send response
    // if user doeesn't exist throw user


    res
        .status(201)
        // .cookie("token", token, cookieOptions)
        .cookie("token", token)
        .json(
            new ApiResponse(201, "User logged in Successfully", { token, ...user })
        );
});

const updateProduct = asyncHandler(async (req, res) => {
    let { userId } = req.payload;
    let { password, newPassword } = req.body;


    res
        .status(200)
        .json(new ApiResponse(201, "Password changed successfully ..."));
});



// get all the user details by username
const getProdDetails = asyncHandler(async (req, res) => {
    let { userId } = req.payload;
    let { username } = req.params;


    res
        .status(200)
        .json(new ApiResponse(200, "User found successfull", userDetails));
});

const getAllProdDetails = asyncHandler(async (req, res) => {
    let { userId } = req.payload;


    res
        .status(200)
        .json(
            new ApiResponse(200, "Image Upload Successful", newProfileUrl)
        );
});


export {
    getAllProdDetails,
    getProdDetails,
    updateProduct,
    deleteProduct,
    createProduct
};
