import morgan from "morgan";
import logger from "../utils/winston.logger.js";

const accessLogStream = {
   write: (message) => logger.http(message.trim())
}

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream: accessLogStream }
)

export default morganMiddleware
