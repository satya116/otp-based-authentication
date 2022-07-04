const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {

    try {
        //get access token
        const { accessToken } = req.cookies;
        console.log("Accesstoken from req.cookies", accessToken);

        if(!accessToken) {
            throw new Error()
        }

        //verify access token
        const userData = await tokenService.verifyAccessToken(accessToken)

        console.log(userData); //basically payload

        if(!userData) {
            throw new Error()
        }

        req.user = userData; //attaching on req

        next();
    } catch (error) {
        res.status(401).json({message: "Invalid Token"})
    }
}