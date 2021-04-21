const axios = require('axios')


class Flutterwave {
    constructor(secretKey) {
        this.secretKey = secretKey
    }

    payment(payload) {
       return axios.post('https://api.flutterwave.com/v3/payments', payload   , {
            headers: {
                Authorization: `Bearer ${this.secretKey}`
            }
        })
    }
      
}

module.exports = Flutterwave
