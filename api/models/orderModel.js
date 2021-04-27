const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderItems: [{
        name: {
            type: String, 
            required: true
        },
        quantity: {
            type: Number, 
            required: true
        },
        image: {
            type: String, 
            required: true
        },
        price: {
            type: Number, 
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
            required: true,
        },
    }],
    shippingAddress: {
        fullname: {
            type: String, required: true
        },
        email: {
            type: String, required: true
        },
        address: {
            type: String, required: true
        },
        city: {
            type: String, required: true
        },
        country: {
            type: String, required: true
        },
    },
    cartPrice: { 
        type: Number, required: true
    },
    shippingPrice: { 
        type: Number, required: true
    },
    totalPrice: { 
        type: Number, required: true
    },
    isPaid: {
        type: Boolean, default: false
    },
    paidAt: {
        type: Date
    },
    paymentReference: {
        type: String, required: false
    }
}, {timestamps: true})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order