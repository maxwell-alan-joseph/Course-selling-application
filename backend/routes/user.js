const { Router } = require('express');

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.json({
        message: "you are signed-up"
    })
});

userRouter.post("/login", (req, res) => {
    res.json({
        message: "you are logged in"
    })
});

userRouter.post("/dashboard", (req, res) => {
    res.json({
        message: "dashboard for his/her courses"
    });
});

userRouter.get("/purchase", (req, res) => {
    res.json({
        message: "getaway to purchase his/her course"
    });
});

module.exports = {
    userRouter: userRouter
}