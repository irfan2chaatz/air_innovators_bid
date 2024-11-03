import { app } from "./app.js"
import dbConnect from "./src/db/dbConnect.js";


dbConnect()
    .then(() => {
        app.listen(3000, () => {
            console.log("AIR_INNV Server is running on Port 3000")
        })
    })