const express = require('express')
const { getBlogs, addBlog, getBlog, updateBlog, deleteBlog } = require('../controllers/blogController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()


router.get("/", getBlogs)
router.get("/:id", getBlog)
router.post("/", protect, addBlog)
router.put("/:id", protect, updateBlog)
router.delete("/:id", protect, deleteBlog)


module.exports = router