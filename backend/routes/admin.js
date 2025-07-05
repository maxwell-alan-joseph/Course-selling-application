const {Router} = require('express');

const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
    res.json({
        message: "you are signed up "
    });
});

adminRouter.post("/login", (req, res) => {
    res.json({
        message: "you are logged in"
    });
});

adminRouter.get("/dashboard", (req, res) => {
    res.json({
        message: "dashboard for analytics - title, students joined, revenue, status"
    });
});

adminRouter.get("/my-courses", (req, res) => {
    res.json({
        message: "list of his/her courses - title, description, price, date-created"
    });
});

adminRouter.post("/create-course", (req, res) => {
    res.json({
        message: "create course - title, description, price, content"
    });
});

adminRouter.post("/update-course", (req, res) => {
    res.json({
        message: "admin can update his/her courses here"
    });
});

adminRouter.post("/delete-course", (req, res) => {
    res.json({
        message: "option to delete the course"
    });
});