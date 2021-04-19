let Flutterwave = require('./tryjson')

let flutterwave = new Flutterwave('xxxxxxxxxxxxxxxxx')

const payload = {"tx_ref": "ersddr434",
        "amount": "100",
        "currency": "NGN",
        "redirect_url": "https://google.com",
        "payment_options": "card",
        "customer":{
            "email": "kolapoolamidun@gmail.com",
            "phonenumber": "08103087162",
            "name": "Kolapo Olamidun",
        },
        "customizations":{
        "title":"Pied Piper Payments",
        "description":"Middleout isn't free. Pay the price",
        "logo":"https://assets.piedpiper.com/logo.png"
   }
}


flutterwave.payment(payload)