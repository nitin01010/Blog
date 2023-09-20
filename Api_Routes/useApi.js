const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const studentModel = require("../db/db");
const BlogModel = require("../BlogShema/BlogShema");

router.post("/api/singup", async (req, res) => {
    try {
        let { name, email, password } = req.body;
        const Hashpass = await bcryptjs.hash(password, 10);
        const data = studentModel({ name: name, email: email, password: Hashpass });
        const newdata = await data.save();
        console.log(newdata);
        res.status(201).redirect('/login');
    } catch (error) {
        res.status(400).send(`there is one error ${error}`);
    }
});


router.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmail = await studentModel.findOne({ email: email });
        const OldPass = await bcryptjs.compare(password, isEmail.password);

        if (OldPass) {
            res.render("dashboard.ejs");
        } else {
            res.status(400).send('password and email is worng!');
        }
    } catch (error) {
        res.status(401).send(` invalid login  : ${error}`);
    }
});

router.post("/api/v1/blogpost", async (req, res) => {
    try {
        const { title, img, paragraph } = req.body;
        const BlogSave = BlogModel({ title: title, img: img, paragraph: paragraph });
        const newBlog = await BlogSave.save();
        res.status(201).redirect("/");
    } catch (error) {
        res.status(401).send(` there is one : ${error}`);
    }
});

router.post("/api/update/v1/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, img, paragraph } = req.body;
        const dataUpdate = await BlogModel.findByIdAndUpdate({ _id: id }, { $set: { title: title, img: img, paragraph: paragraph } });

        dataUpdate.save();
        console.log(dataUpdate);
        res.redirect("/");
    } catch (error) {
        res.status(401).send(` there is one : ${error}`);
    }
});


module.exports = router;

