import mongoose from "mongoose";


export const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "User" ,
        required: true
    },
productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Product" ,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdTime: { type: Date, default: Date.now }
})

const Comment =  mongoose.model("Comment", commentSchema);

export default Comment

