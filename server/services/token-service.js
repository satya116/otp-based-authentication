const jwt = require('jsonwebtoken')
const refreshModel = require('../model/refreshModel')


class tokenServices {

    async generateToken (payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: '1h'
        })

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: '1y'
        })

        return { accessToken, refreshToken }
    }

    async storeRefreshToken(token, userId) {
        try {
            await refreshModel.create({
                token: token,
                userId: userId
            })
        } catch (err) {
            console.log(err);
        }
    }

    //verifyAccessToken

    async verifyAccessToken (accessTokenn) {
        return jwt.verify(accessTokenn, process.env.JWT_ACCESS_TOKEN )

    }

    //verifyRefreshToken

    async verifyRefreshToken (refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
    }

    async findRefreshToken(userId, refreshToken) {
        try {
            return await refreshModel.findOne({ userId: userId, token: refreshToken })

        } catch (error) {
            console.log("Db error", error);
        }
    }

    async updateRefreshToken (userId, tokenrefresh ) {
        return await refreshModel.updateOne({userId: userId}, {token: tokenrefresh})
    }

    async removeToken ( refreshToken ) {
        return await refreshModel.deleteOne({token: refreshToken})
    }
}

module.exports = new tokenServices()