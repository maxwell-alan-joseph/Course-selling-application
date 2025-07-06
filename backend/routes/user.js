const { Router } = require('express');
const userRouter = Router();


userRouter.post("/signup", (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    res.json({
        message: "you are signed-up"
    })
});

userRouter.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    res.json({
        message: "you are logged in"
    })
});

module.exports = {
    userRouter: userRouter
}