// const express = require('express')
const cloudinary = require('../config/cloudinary')
// const expressAsyncHandler = require('express-async-handler')
// const multer = require('multer')

const data = require('../data')
const Product = require('../models/productModel')
// const { authUser } = require('../utils')

const productsList = async(req, res) =>{
    const products = await Product.find({})
    res.send(products)
}

const productCreate = async(req, res) =>{

    const uploadedImage = await cloudinary.uploader.upload(req.file.path)
    console.log(uploadedImage)

    const product = new Product({
        name: req.body.name,
        image: req.file.path,
        cloudinary_id: uploadedImage.secure_url, 
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        user: req.user._id 
    })

    const productsCreated = await product.save()
    res.status(201).json({message: 'Product has been created',
    results:productsCreated})
}


const productUpdate = async(req, res) =>{
    const id = req.params.id
    const update = req.body
    const options = {new: true}
    const product = await Product.findByIdAndUpdate(id, update, options)
    res.send({message: 'Product updated', product: product})
}


const productDelete = async(req, res) =>{
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id)
    res.send({message: 'Product has been deleted'})
}


const singleProduct = async(req, res) =>{
    const productDetails = await Product.findById(req.params.id)
    if(productDetails){
        res.send(productDetails)
    }else{
        res.status(404).send({'Error': 'Product cannot be found!'})
    }
    
}

module.exports = {
    productsList,
    productCreate,
    productDelete,
    productUpdate,
    singleProduct
}