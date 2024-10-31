import 'dotenv/config'

let CONFIG = {}

//common variables
CONFIG.SALT_ROUNDS = +process.env.SALT_ROUNDS
CONFIG.PORT = process.env.PORT
CONFIG.STATIC_PATH = "/public/images/";
CONFIG.DEFAULT_PROFILE_URL = "https://placehold.co/200x200";
CONFIG.REACT_BASE_URL = "http://localhost:5173";

if (process.env.SMTP_ENV == 'gmail') {
    CONFIG.SMTP_HOST = process.env.GMAIL_SMTP_HOST
    CONFIG.SMTP_PORT = process.env.GMAIL_SMTP_PORT
    CONFIG.SMTP_USER = process.env.GMAIL_SMTP_USER
    CONFIG.SMTP_PASS = process.env.GMAIL_SMTP_PASS
}

if (process.env.NODE_ENV == 'development') {
    CONFIG.JWT_SECRET_KEY = process.env.DEV_JWT_SECRET_KEY
    CONFIG.MONGO_DB_URL = process.env.DEV_MONGO_DB_URL
    CONFIG.DB_NAME = process.env.DEV_DB_NAME
}
else if (process.env.NODE_ENV == 'staging') {
    CONFIG.JWT_SECRET_KEY = process.env.STAGING_JWT_SECRET_KEY

}
else if (process.env.NODE_ENV == 'production') {
    CONFIG.JWT_SECRET_KEY = process.env.PROD_JWT_SECRET_KEY
}


export default CONFIG
