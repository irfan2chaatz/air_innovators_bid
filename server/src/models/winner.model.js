import mongoose from 'mongoose';

const winnerSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
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


export default mongoose.model("Winner", winnerSchema, "winner");