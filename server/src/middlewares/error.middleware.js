import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
import logger from "../utils/winston.logger.js";

function globalErrorMiddleware(err, req, res, next) {
    console.log("FROM AIR INNOVATORS GLOBAL ERROR MIDDLEWARE ");
    console.log(err.message);

    // winston logger => error.log
    logger.error(err.message)

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(err)
    }

    if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json(new ApiError(401, "Token Invalid"));
    }


    res.status(500).json(new ApiError(500, "Something Went Wrong"));
}

export default globalErrorMiddleware