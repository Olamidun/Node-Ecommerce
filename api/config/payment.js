const axios = require('axios')


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
    
    async verifyPayment(ref){
        const res = await axios.get(`https://api.flutterwave.com/v3/transactions/${ref}/verify`, {
            headers: {
                Authorization: `Bearer ${this.secretKey}`,
                'Content-Type': 'Application/json'
            }
        })
        // console.log(res)
        return res
    } 

}

module.exports = Flutterwave
