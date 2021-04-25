const axios = require('axios')
const { json } = require('express')


class Flutterwave {
    constructor(secretKey) {
        this.secretKey = secretKey
    }

    async payment(payload) {
     const res = await axios.post('https://api.flutterwave.com/v3/payments', payload, {
            headers: {
                Authorization: `Bearer ${this.secretKey}`
            }
        })
    return res
    } 

}

module.exports = Flutterwave
