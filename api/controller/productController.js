// const express = require('express')
const cloudinary = require('../config/cloudinary')
// const expressAsyncHandler = require('express-async-handler')
// const multer = require('multer')

const data = require('../data')
const {Product, ProductRating} = require('../models/productModel')
// const { authUser } = require('../utils')

const productsList = async(req, res) =>{
    const products = await Product.find({})
    res.json(products)
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
    res.json({message: 'Product updated', product: product})
}


const productDelete = async(req, res) =>{
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id)
    res.json({message: 'Product has been deleted'})
}


const singleProduct = async(req, res) =>{
    const productDetails = await Product.findById(req.params.id)
    if(productDetails){
        res.json(productDetails)
    }else{
        res.status(404).json({'Error': 'Product cannot be found!'})
    }
    
}

const newRating = async(req, res) =>{
    const product = await Product.findById(req.params.id)
    const rating = new ProductRating({
        rating: req.body.rating,
        reviews: req.body.review,
        product: product._id
    })
    const createdRating = await rating.save()
    res.status(201).json({message: 'Thank you for rating this product', rating: createdRating})
}


const ratings = async(req, res) =>{
    const rating = await ProductRating.find({product:req.params.id})
    if (rating.length !== 0){
        res.status(200).json({message: 'success', rating})
    } else{
        res.status(404).json({message: 'error, no ratings for this product yet'})
    }
}

const singleRating = async(req, res) =>{
    const rating = await ProductRating.findById({product: req.params.id, _id:req.params.ratingId})
    console.log(rating.product)
    if (rating){
        if (req.params.id == rating.product){
        
            res.status(200).json({
                message: 'Successfully fetched rating', rating
            })
        } else {
            // console.log(rating.product._id + req.params.id)
            res.status(400).json({
                
                status: 'Error', message: 'Rating you are trying to fetch does not belong to this product'
            })
        }
       
    } else{
        res.status(404).json({status:'error', message: 'Rating with this id does not exist'})
    }
}

module.exports = {
    productsList,
    productCreate,
    productDelete,
    productUpdate,
    singleProduct,
    newRating,
    ratings,
    singleRating
}