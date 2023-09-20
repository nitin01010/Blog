const express = require("express");
const BlogModel = require("../BlogShema/BlogShema");
const router = express.Router();



router.get("/", async (req, res) => {
    try {
        const All_BlogData = await BlogModel.find({});
        res.render("Home.ejs", { data: All_BlogData });
    } catch (error) {
        console.log(`there is one error ${error}`.red.black);
    }
});



router.get("/login", async (req, res) => {
    try {
        res.render("Login.ejs");
    } catch (error) {
        console.log(`there is one error ${error}`.red.black);
    }
});



router.get("/singup", async (req, res) => {
    try {
        res.render("Singup.ejs");
    } catch (error) {
        console.log(`there is one error ${error}`.red.black);
    }
});

router.get("/createBlog", async (req, res) => {
    try {
        res.render("NewBlog.ejs");
    } catch (error) {
        console.log(`there is one error ${error}`.red.black);
    }
});


router.get("/:id/read", async (req, res) => {
    try {
        const id = req.params;
        const BlogRead = await BlogModel.findOne({ '_id': id.id });
        res.render('Post.ejs', { data: BlogRead });
    } catch (error) {
        res.status(401).send(`there is one error ${error}`);
    }
});

router.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delBlog = await BlogModel.findByIdAndDelete({ _id: id });
        res.redirect("/");
    } catch (error) {
        res.status(401).send(`there is one error ${error}`);
    }
});

router.get("/api/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateBlog = await BlogModel.findByIdAndUpdate({ _id: id });

        res.render("Update.ejs", { data: updateBlog });
    } catch (error) {
        res.status(401).send(`there is one error ${error}`);
    }
});




module.exports = router;