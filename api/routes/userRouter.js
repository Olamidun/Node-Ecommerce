const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const data = require('../data')
const User = require('../models/userModels.js')
const userRouter = express.Router()

userRouter.get('/users', expressAsyncHandler(async (req, res) =>{
    const createdUsers = await User.insertMany(data.users)
    res.send({
        createdUsers
    })
}))

module.exports = userRouter