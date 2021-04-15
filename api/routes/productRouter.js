const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    },
})

const fileFilter = (req, file, cb) =>{
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        // Accept a file
        cb(null, true);
    } else {
        cb(new Error('Your image must have a jpeg or png extension'), false);
    }
}
const upload = multer({storage: storage, 
    limits: {
        fileSize:1024 * 1024 * 5
    },
    fileFilter: fileFilter
})
const data = require('../data')
const Product = require('../models/productModel')

const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler(async(req, res) =>{
    const products = await Product.find({})
    res.send(products)
}))


productRouter.post('/', upload.single('image'), expressAsyncHandler(async(req, res) =>{
    console.log(req.file)
    const product = new Product({
        name: req.body.name,
        image: req.file.path, 
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    })

    const productsCreated = await product.save()
    res.status(201).json({message: 'Product has been created',
    products: productsCreated})
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