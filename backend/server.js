const express = require('express')
const connectDB = require('./config/dbConfig')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 5000

// Db Connection
connectDB()

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req, res) => {
    res.json({
        msg: "WELCOME TO BLOG API 1.0"
    })
})


// Blog Routes
app.use("/api/blogs", require("./routes/blogRoutes"))
// Auth Routes
app.use("/api/auth", require("./routes/userRoutes"))


app.listen(PORT, () => {
    console.log(`Server is running at PORT : ${PORT}`)
})