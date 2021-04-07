const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const data = require('../data')
const Product = require('../models/productModel')

const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler(async(req, res) =>{
    const products = await Product.find({})
    res.send(products)
}))


productRouter.get('/seed', expressAsyncHandler(async(req, res) =>{
 const createdProducts = await Product.insertMany(data.products)

 res.send({products: createdProducts})
}))


productRouter.get('/:id', expressAsyncHandler(async(req, res) =>{
    const productDetails = await Product.findById(req.params.id)
    if(productDetails){
        res.send(productDetails)
    }else{
        res.status(404).send({'Error': 'Product cannot be found!'})
    }
    
}))
module.exports = productRouter