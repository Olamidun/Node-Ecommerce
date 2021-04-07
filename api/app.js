const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')

const app = express()
const port = process.env.PORT || 5000
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

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message})
})
app.listen(port, () =>{
    console.log('Server is running')
})