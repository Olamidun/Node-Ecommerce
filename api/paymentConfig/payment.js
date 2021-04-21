const axios = require('axios')


class Flutterwave {
    constructor(secretKey) {
        this.secretKey = secretKey
    }

    payment(payload) {
       axios.post('https://api.flutterwave.com/v3/payments', payload   , {
            headers: {
                Authorization: `Bearer ${this.secretKey}`
            }
        })
        .then((response) =>{
            console.log(response.data)
            return {
                success: true,
                response: response.data
            }
        })
        .catch((err) =>{
            return {
                success: false,
                response: err
            }
        })
    }
      
}

module.exports = Flutterwave
