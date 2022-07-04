const crypto = require('crypto')
const hashServices = require('./hash-service')

const twilio = require('twilio')(process.env.TWILIO_SERVICE_SID, process.env.TWILIO_SERVICE_AUTH_TOKEN, {
    lazyLoading: true
})

class OTPservices {
    async generateOTP() {
        return await crypto.randomInt(1000, 9999)
    }

    async sentOTP(phone, otp ) {
        return await twilio.messages.create({
        to: `+91${phone}`,
        from: process.env.TWILIO_MY_NUMBER,
        body: `Your OTP is ${otp}`
        })
    }

    verifyOTP(hashedData, data) {  // by giving its as a async shows diff behaviour

        let compute = hashServices.hashOTP(data)

        return compute === hashedData

    }




}

module.exports = new OTPservices()


