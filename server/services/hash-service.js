const crypto = require('crypto')


class hashServices {
    hashOTP(data){    //bhai sahab async await tooo important yarrr
        //crypto.createHmac(algorithm, key[, options])   returns Hmac
        return crypto.createHmac('sha256', process.env.OTP_HASHED_SECRET).update(data).digest('hex');
    }

}

module.exports = new hashServices()