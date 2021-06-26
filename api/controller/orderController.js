const Order = require('../models/orderModel')
let Flutterwave = require('../config/payment')
// require('dotenv').config()

let flutterwave = new Flutterwave(`${process.env.key}`)
console.log(flutterwave)


const createOrder = async(req, res) =>{
    let reference = (length) =>{
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result.push(characters.charAt(Math.floor(Math.random() * 
            charactersLength)));
        }
        return result.join('');

    }
    if(req.body.orderItems.lenght === 0) {
        res.status(400).send({message: 'Cart is empty'})
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            cartPrice: req.body.cartPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            paymentReference: reference(15)  
        })

        const createdOrder = await order.save()
        res.status(201).send({message: 'Your order has been created', order: createdOrder})
    }
}

const getOrder = async(req, res) =>{
    const order = await Order.findById(req.params.id)
    if(order){
        res.send(order)
    }else{
        res.status(404).send({message: 'Order not found'})
    }

}

const payForOrder = async(req, res) =>{
    const order = await Order.findById(req.params.id)
    // console.log(order)
    if(order){
    
        let payload = {
            "tx_ref": order.paymentReference,
                "amount": order.totalPrice,
                "currency": "NGN",
                "redirect_url": `http://localhost:5000/api/orders/${order._id}/verifypayment`,
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
}

const verifyOrderPayment = async(req, res) =>{
    const order = await Order.findById(req.params.id)
    const transactionId = req.query.transaction_id
    if(order){
        let response = await flutterwave.verifyPayment(transactionId)
        console.log(response)
        if(response.data.data.tx_ref === order.paymentReference && response.data.data.amount === order.totalPrice && response.data.status === "success"){
            order.isPaid = true
            order.paidAt = Date.now()
            const updatedOrder = await order.save()
            res.json({message: 'Your order has been successfully placed, thanks for using our platform', order: updatedOrder})
        } else {
            res.json({error: 'Your payment was not completed!!!'})
        }
        
    } else {
        res.status(404).send({message: 'Order not found'})
    }
}

module.exports = {
    verifyOrderPayment,
    payForOrder,
    createOrder,
    getOrder
}