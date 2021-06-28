require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./api/routes/userRouter')
const productRouter = require('./api/routes/productRouter')
const orderRouter = require('./api/routes/orderRouter')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 5000
console.log(port)
try{
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    // mongodb+srv://8SgLP8Dhd1PJ3F21@@nodeecommerce.qmtrr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
}catch(err){
    console.log(err);
}
// mongodb://localhost:27017/nodecommerce
app.use('/api', userRouter)

app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message})
})
app.listen(port, () =>{
    console.log('Server is running')
})