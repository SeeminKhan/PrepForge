const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * Optional authentication middleware - sets req.user if token is valid, but doesn't block the request
 */
async function optionalAuth(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        req.user = null
        return next()
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })

    if (isTokenBlacklisted) {
        req.user = null
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
    } catch (err) {
        req.user = null
    }

    next()
}

module.exports = { optionalAuth }
