const express = require('express')
const {productsList, productCreate, productDelete, productUpdate, singleProduct} = require('../controller/productController')
// const cloudinary = require('../config/cloudinary')
const expressAsyncHandler = require('express-async-handler')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    },
})

const fileFilter = (req, file, cb) =>{
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        // Accept a file
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format'), false);
    }
}
const upload = multer({storage: storage, 
    limits: {
        fileSize:1024 * 1024 * 5
    },
    fileFilter: fileFilter
})
// const data = require('../data')
// const Product = require('../models/productModel')
const { authUser } = require('../utils')

const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler(productsList))

productRouter.post('/', authUser, upload.single('image'), expressAsyncHandler(productCreate))

productRouter.patch('/:id', authUser, expressAsyncHandler(productUpdate))

productRouter.delete('/:id', authUser, expressAsyncHandler(productDelete))

productRouter.get('/:id', expressAsyncHandler(singleProduct))
module.exports = productRouter