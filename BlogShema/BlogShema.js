const mongoose = require("mongoose");

const BlogShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    paragraph: {
        type: String,
    }
});

const BlogModel = mongoose.model('AllBlog', BlogShema);

module.exports = BlogModel;
