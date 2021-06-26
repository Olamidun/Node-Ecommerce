const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const {verifyOrderPayment, payForOrder, createOrder, getOrder} = require('../controller/orderController')
// const Order = require('../models/orderModel')
// let Flutterwave = require('../config/payment')
require('dotenv').config()

const orderRouter = express.Router()

// let flutterwave = new Flutterwave(`${process.env.key}`)

orderRouter.post('/', expressAsyncHandler(createOrder))

orderRouter.get('/:id', expressAsyncHandler(getOrder))

orderRouter.get('/:id/payment', payForOrder)

orderRouter.get('/:id/verifypayment',  expressAsyncHandler(verifyOrderPayment))
module.exports = orderRouter