const { Router } = require('express');
 
const courseRouter = Router();


courseRouter.get("/dashboard", (req, res) => {

    const userId = req.userId;

    res.json({
        message: "dashboard for user courses!"
    });
});

courseRouter.get("/purchase", (req, res) => {

    const userId = req.userId;
    const courseId = req.courseId;

    res.json({
        message: "purchase endpoint where the user can buy the course "
    });
});

courseRouter.get("/dashboard", (req, res) => {

    const adminId = req.adminId;

    res.json({
        message: "dashboard for admin courses!"
    });
});

courseRouter.get("my/", (req, res) => {

    const adminId = req.adminId

    res.json({
        message: "list of admin courses"
    })
});

courseRouter.post("/create|add", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const content = req.body.content;

    res.json({
        message: "created course"
    })
});

courseRouter.post("/update", (req, res) => {

    const courseId = req.courseId;
    
    res.json({
        message: "updated course by admin"
    })
});

courseRouter.delete("/delete", (req, res) => {

    const courseId = req.courseId;
    
    res.json({
        message: "Deleted the course"
    });
});

module.exports = {
    courseRouter: courseRouter
}