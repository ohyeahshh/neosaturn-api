var sib = require('sib-api-v3-sdk');

var client = sib.ApiClient.instance;

var apiKey = client.authentications['api-key'];
apiKey.apiKey = "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"

const tranEmailApi = new sib.TransactionalEmailsApi()

const sender = {
    email: 'moondst14@gmail.com',
    name: 'Neosaturn 🏦'
    
}

const receivers = [
    {
        email: 'divyayashsaxena2000@gmail.com',
    }
]

tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject:"Authenticate your email address",
    textContent:"Your email OTP is {{params.otp}}",
    params:{
        otp:"222222"
    }
}).then(console.log)
.catch(console.log)


