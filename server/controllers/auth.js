const OTPservices = require("../services/otp-service");
const hashServices = require("../services/hash-service");
const userServices = require('../services/user-service')
const tokenServices = require('../services/token-service');

const userDto = require('../dtos/user-dto');

const userModel = require("../model/userModel"); //

class AuthController {

    async sentOTP(req, res) {
        const phone = req.body.phone;

        if(!phone) {
            res.status(404).json({message: 'Mobile number required'})
        }

        const otp = await OTPservices.generateOTP();

        const expiresIn = Date.now() + 1000*60*2

        const data = `${phone}.${otp}.${expiresIn}`

        const hashedData = hashServices.hashOTP(data);

        //sentotp

       try {
        //await OTPservices.sentOTP(phone, otp)   // dont forget to uncomment
        res.status(200).json({
            hash: `${hashedData}.${expiresIn}`,
            phone,
            otp
        })

       } catch (error) {
           res.status(501).json({
               message: `Couldnot sent otp ${error}`
           })
       }
    }

    async verifyOTP(req, res) {
        const { otp, hash, phone} = req.body;

        if(!otp || !hash || !phone) {
            return res.status(400).json({message: "All fields are required"})
        }

        const [hashedData, expiresIn] = hash.split('.')

        if(Date.now() > +expiresIn) {
            return res.status(400).json({message: "Time out"})
        }

        let data = `${phone}.${otp}.${expiresIn}`

        let isSame = OTPservices.verifyOTP(hashedData, data);

        if(!isSame) {
            return res.status(400).json({message: "Invalid OTP"})
        }

        let user

        try {
            user = await userServices.findUser({ phone: phone })

            if( !user || user === null) {
               await userServices.createUser(phone)  ////user
               console.log("auth.js G73 Welcome New User", user);

               user = await userServices.findUser({ phone: phone }) ///kelaaaa
               console.log("auth.js G76",user);
               //res.status(200).json({message: "New user and user saved saved successfully"})
            } else {
                console.log("auth.js G79 Welcome back Old User");
            }
        } catch (error) {
            console.log(" auth.js G82 Unable to find and create user", error);
        }

        //refreshtoken and accesstoken

        const { accessToken, refreshToken } = await tokenServices.generateToken({_id: user._id})

        //storing refresh token to db
        await tokenServices.storeRefreshToken(refreshToken, user._id )

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000*60*60*24*30, //30 day
            httpOnly: true
        })

        res.cookie('accessToken', accessToken, {
            maxAge: 1000*60*60*24,  // 1 day
            httpOnly: true
        })

        const userDtoo = new userDto(user);

        res.json({ auth: true , user: userDtoo })
    }

    //for refresh  in client app

    async refresh(req, res) {
        // get refresh token from cookie
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        // check if token is valid
        let userData;
        try {
            userData = await tokenServices.verifyRefreshToken(
                refreshTokenFromCookie
            );
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }

        console.log("auth.js G122, user._id",userData._id);
        console.log("auth.js G122 refreshToken from cookie",refreshTokenFromCookie);

        // Check if token is in db
        try {
            const token = await tokenServices.findRefreshToken(
                userData._id,
                refreshTokenFromCookie //db check failing....
            );
            if (!token) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }

        // check if valid user //gpla here
        const user = await userServices.findUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: 'No user' });
        }



        // Generate new tokens
        const {  accessToken, refreshToken } = await tokenServices.generateToken({
            _id: userData._id,
        });  //kela async await

        console.log("lets check auth.js G144 ", refreshToken, accessToken );  //what the faak

        // Update refresh token
        try {

            await tokenServices.updateRefreshToken(userData._id, refreshToken); //gpla tha
        } catch (err) {
            return res.status(502).json({ message: 'Internal error' });
        }
        // put in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        // response
        const userDtoo = new userDto(user);
        res.json({ user: userDtoo, auth: true });
    }

    async logout(req, res) {

        const { refreshToken } = req.cookies;

        //delete refresh token from  db

        await tokenServices.removeToken( refreshToken );

        //delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({ user: null, auth: false});

    }

}

module.exports = new AuthController()

