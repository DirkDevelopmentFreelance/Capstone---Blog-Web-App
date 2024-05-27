import express from "express";
import bodyParser from "body-parser";
import ShortUniqueId from "short-unique-id";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";

const APP = express();
const PORT = 3000;
const __DIRNAME = dirname(fileURLToPath(import.meta.url));

let blogs = []

APP.use(express.static(path.join(__DIRNAME,"/public")));

APP.use(bodyParser.urlencoded({ extended: true }))


APP.get("/", (req, res) => {
    res.render("index.ejs", {
        blogs: blogs,
    });
});

APP.get("/user/create-blog", (req, res) => {
    res.render("create_post.ejs", {
        blogs: blogs,
    });
});

APP.post("/submit", (req, res) => {
    const uid = new ShortUniqueId({length:5})
    const body = req.body;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateStr = `${year}/${month}/${day}`;
    const newBlog = {
        id: uid,
        title: body.title,
        text: body.blog_text,
        creation: dateStr
    };
    blogs.push(newBlog);
    res.render("index.ejs", {
        blogs: blogs
    });
})

APP.get("/blog/:title", (req, res) => {
    const title = req.params.title;
    const currentBlog = blogs.find(blog => blog.title === title);
    res.render("view_blog.ejs", {
        blogs: blogs,
        currentBlog: currentBlog,
    })
});

APP.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
});