const express = require('express')
const { getBlogs, addBlog, getBlog, updateBlog, deleteBlog } = require('../controllers/blogController')

const router = express.Router()


router.get("/", getBlogs)
router.get("/:id", getBlog)
router.post("/", addBlog)
router.put("/:id", updateBlog)
router.delete("/:id", deleteBlog)


module.exports = router