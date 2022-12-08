const jwt = require("jsonwebtoken")
require("dotenv").config()

function genertedJwt(userId){
    const payLoad = {
        user : {
            id: userId
        }
    }

    return jwt.sign(payLoad, process.env.jwtSecret, {expiresIn: "1h"})
}

module.exports = genertedJwt