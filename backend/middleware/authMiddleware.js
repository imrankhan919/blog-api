const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const protect = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            let token = req.headers.authorization.split(" ")[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            let user = await User.findById(decoded.id).select("-password")
            req.user = user
            next()
        } catch (error) {
            res.status(401).json({
                msg: "This is protected route"
            })
        }
    } else {
        res.status(401).json({
            msg: "This is protected route"
        })
    }

}


module.exports = protect