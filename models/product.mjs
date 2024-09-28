import mongoose from 'mongoose';
import Category from './category.mjs';
import {commentSchema} from './comment.mjs';

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    images: { type: String , required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    comments: [commentSchema]

})

const Product = mongoose.model("Product", productsSchema);

export default Product