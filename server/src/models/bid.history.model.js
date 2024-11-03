import mongoose from 'mongoose';

const biddingHistorySchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    userInterest: {
        type: String,
        default: "IN",   // OUT
        enum: ["IN", "OUT"], // Adjust as needed
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bidAmount: {
        type: Number,
        required: true,
        min: 0,
    }
}, {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
});


export default mongoose.model("BiddingHistory", biddingHistorySchema, "biddingHistory");
