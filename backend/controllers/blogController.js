const Blog = require("../model/blogSchema")


const getBlogs = async (req, res) => {

    // DB QUERY FOR GETTING ALL BLOGS
    const blogs = await Blog.find()

    if (!blogs) {
        res.status(404)
        res.json({
            msg: "No Blogs Found!"
        })
    }

    res.json(blogs)
}

const getBlog = async (req, res) => {

    // Db QUERY TO FIND BLOG BY ID
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        res.status(404)
        res.json({
            msg: "Blog Not Found!"
        })
    }

    res.json(blog)

}

const addBlog = async (req, res) => {

    const { title, description, author } = req.body

    if (!title || !description || !author) {
        res.status(400)
        res.json({
            msg: "Please Fill All Details..."
        })
    }

    // Save Document In DB
    const newBlog = await Blog.create({
        title, description, author
    })

    if (!newBlog) {
        res.status(400)
        res.json({
            msg: "Blog Not Created!"
        })
    }

    res.status(201).json(newBlog)


}

const updateBlog = async (req, res) => {

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body)

    if (!updatedBlog) {
        res.status(400)
        throw new Error('Blog Not Updated')
    }

    res.status(200).json(updatedBlog)

}

const deleteBlog = async (req, res) => {

    await Blog.findByIdAndDelete(req.params.id)

    res.status(200).json({
        _id: req.params.id,
        msg: "Blog Deleted!"
    })


}




module.exports = { getBlogs, addBlog, getBlog, updateBlog, deleteBlog }