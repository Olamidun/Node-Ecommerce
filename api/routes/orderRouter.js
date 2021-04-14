const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

const orderRouter = express.Router()

orderRouter.post('/', expressAsyncHandler(async(req, res) =>{
    if(req.body.orderItems.lenght === 0) {
        res.status(400).send({message: 'Cart is empty'})
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            cartPrice: req.body.cartPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,  
        })

        const createdOrder = await order.save()
        res.status(201).send({message: 'Your order has been created', order: createdOrder})
    }
}))

module.exports = orderRouter