const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        name: {
            type: String, 
            required: true, unique: true
        },
        image: {
            type: String, required: true
        },
        cloudinary_id: {
            type: String
        },
        brand: {
            type: String, required: true
        },
        category: {
            type: String, required: true
        },
        description: {
            type: String, required: true
        },
        price: {
            type: Number, required: true
        },
        countInStock: {
            type: Number, required: true
        },
        rating: {
            type: Number, required: true
        },
        numReviews: {
            type: Number, required: true
        },
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    }, 
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema)

module.exports = Product
