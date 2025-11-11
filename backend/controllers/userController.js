const User = require("../model/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {

    // Check if all fileds are filled
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        res.json({
            msg: "Please Fill All Details!!"
        })
    }

    // Check if user already exists
    const userExist = await User.findOne({ email: email })

    if (userExist) {
        res.status(400).json({
            msg: "User Already Exist!"
        })
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    // Create User
    const user = await User.create({ name, email, password: hashedPassword })

    if (!user) {
        res.status(400).json({
            msg: "User Not Created!"
        })
    }

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
}


const loginUser = async (req, res) => {
    // Check if all fileds are filled
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        res.json({
            msg: "Please Fill All Details!!"
        })
    }

    const user = await User.findOne({ email: email })

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({
            msg: "Invalid Credentials"
        })
    }

}


// Generate Token
const generateToken = (id) => {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    return token
}


const privateController = (req, res) => {

    res.json({
        message: `Request Made By ${req.user.name}`
    })

}



module.exports = { registerUser, loginUser, privateController }