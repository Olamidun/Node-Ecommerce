const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
let Flutterwave = require('../paymentConfig/payment')
require('dotenv').config()

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

orderRouter.get('/:id', expressAsyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id)
    if(order){
        res.send(order)
    }else{
        res.status(404).send({message: 'Order not found'})
    }

}))

orderRouter.get('/:id/payment', expressAsyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id)
    // console.log(order)
    if(order){
        let flutterwave = new Flutterwave(`${process.env.key}`)
        let payload = {
            "tx_ref": "ersddr434",
                "amount": order.totalPrice,
                "currency": "NGN",
                "redirect_url": "https://google.com",
                "payment_options": "card",
                "customer":{
                    "email": order.shippingAddress.email,
                    "phonenumber": "08103087162",
                    "name": order.shippingAddress.fullname,
                },
                "customizations":{
                "title":"Pied Piper Payments",
                "description":"Middleout isn't free. Pay the price",
                "logo":"https://assets.piedpiper.com/logo.png"
            }
        }
        const response = await flutterwave.payment(payload)
        res.send(response.data)
        
    }else{
        res.status(404).send({message: 'Order not found'})
    }
}))
module.exports = orderRouter