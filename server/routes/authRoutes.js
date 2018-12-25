const passport = require("passport");
const mongoose = require("mongoose");
const Blog = mongoose.model("blogs");

module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );

    app.get("/auth/google/callback", passport.authenticate("google"));

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });

    app.get("/api/logout", (req, res) => {
        req.logout();
    });

    app.get("/blogs/new", (req, res) => {
        res.render("AddPosts.ejs");
    });

    app.post("/blogs", (req, res) => {
        const { name, image, description, message } = req.body;

        // console.log(title);
        // console.log(image);
        // console.log(description);
        // console.log(message);

        const blog = new Blog({
            name,
            image,
            description,
            message,
            _user: req.user.id,
            dateMade: Date.now()
        }).save();

        res.redirect("/blogs");
    });

    app.get("/blog/:id", async (req, res) => {
        const id = req.params.id;
        const blog = await Blog.find({ _id: id });
        console.log(blog);
        res.render("Blog_Single.ejs", { blog: blog });
    });

    app.get("/blogs", async (req, res) => {
        const blogs = await Blog.find({ _user: req.user.id });

        res.render("Dashboard.ejs", { blogs: blogs });
    });

    app.get("/blog/delete/:id", async (req, res) => {
        await Blog.deleteOne({ _id: req.params.id });

        res.redirect("/blogs");
    });

    app.get("/", async (req, res) => {
        // if (req.user) {
        //     res.redirect("/blogs");
        // } else {
        const blogs = await Blog.find({});
        res.render("Landing.ejs", { blogs: blogs });
        //}
    });
};
