const axios = require('axios')


class Flutterwave {
    constructor(secretKey) {
        this.secretKey = secretKey
    }

    payment(payload) {
        axios.post('https://api.flutterwave.com/v3/payments', payload, {
            headers: {
                Authorization: `Bearer ${this.secretKey}`
            }
        })
        .then((res) =>{
            console.log(res.data)
            return {
                success: true,
                ...res.data
            }
        })
        .catch((err) =>{
            console.log(err)
            return {
                success: false,
                message: err
            }
        })
    }
}

module.exports = Flutterwave
