const jwt = require('jsonwebtoken')

const generateToken = (user) =>{
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        }, `${process.env.JWT_SECRET}` || 'somethingsecret', {
            expiresIn: '30d',
        })
}

const authUser = (req, res, next) =>{
    const authorization = req.headers.authorization
    if(authorization){
        const token = authorization.slice(7, authorization.lenght)
        jwt.verify(
            token,
            `${process.env.JWT_SECRET}` || 'somethingsecret',
            (err, decode) =>{
                if(err) {
                    res.status(401).send({message: 'Invalid Token'})
                } else{
                    
                    req.user = decode
                    switch(req.user.isAdmin){
                        case false:
                            res.status(403).send({message: 'You are not authorized to access this url'})
                            break
                        case true:
                            next()
                            break
                        default:
                            res.status(403).send({error: 'You are not an admin'})
                            break
                    }
                    // if (req.user.isAdmin === false){
                    //     res.status(403).send({message: 'You are not authorized to access this url'}) 
                    // } else {
                    //     next()
                    // }
                }
                
            }
        )
    } else{
        res.status(401).send({message: 'No Token'})
    }
}

module.exports = {generateToken, authUser}