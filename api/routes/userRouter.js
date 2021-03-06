const express = require('express')
const bcrypt = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const data = require('../data')
const User = require('../models/userModels.js')
const {generateToken} = require('../utils')
const userRouter = express.Router()

userRouter.get('/users', expressAsyncHandler(async (req, res) =>{
    const createdUsers = await User.insertMany(data.users)
    res.json({
        createdUsers
    })
}))

userRouter.post('/signin', expressAsyncHandler(async(req, res) =>{
    const user = await User.findOne({
        email: req.body.email
    })
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return;
        }
    }
    res.status(401).json({message: 'Invalid user details'})
}))

userRouter.post('/register', expressAsyncHandler(async(req, res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save()
    res.json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    })
}))
module.exports = userRouter