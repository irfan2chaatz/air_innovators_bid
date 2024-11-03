import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startingBid: {  // starting amount from where the Bid starts
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "open",
        enum: ["open", "closed"], // Adjust as needed
    }
}, {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
});

export default mongoose.model("Product", productSchema, "products");
