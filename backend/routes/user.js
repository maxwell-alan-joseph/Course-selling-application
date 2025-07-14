const { Router } = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { userModel, adminModel, courseModel } = require("./db");

const userRouter = Router();
const JWT_SECRET = "pass"


userRouter.post("/signup", async (req, res) => {
    const { email, password, name} = req.body;

   await userModel.create({
        email, password, name
    })
    
    res.json({
        message: "You are signed up"
    })
});

userRouter.post("/login", async (req, res) => {
    const { email, password} = req.body;

    const user = await userModel.findOne ({
        email, password
    })

    if(user) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET)

        res.json({
            token,
            message: "You are logged in"
        })
    } else {
        res.status(300).json({
            message: "invalid credentials"
        })
    }

    res.json({
        message: "You are logged in ! Welcome Back"
    })
});

userRouter.post("/purchase", (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

 //if the userId has the valid token and if the courseId from the course-db is true then await him on a buffer page for 5 seconds and redirect
 //him to the notification page saying "Congratulations on the course! Happy learning"

 res.json({
    message: "Congratulation on buying the course ! Happy Learning!"
 })

})


module.exports = {
    userRouter: userRouter
}