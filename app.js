require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./api/routes/userRouter')
const productRouter = require('./api/routes/productRouter')
const orderRouter = require('./api/routes/orderRouter')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 5001
try{
    mongoose.connect('mongodb://localhost:27017/nodecommerce', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}catch(err){
    console.log(err);
}



// app.get('/', (req, res) =>{
//     res.send('Server is ready')
// }) 

app.use('/api', userRouter)

app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message})
})
app.listen(port, () =>{
    console.log('Server is running')
})