const { Router } = require('express');
const mongoose = require('mongoose');

const { userModel, adminModel, courseModel } = require("./db");
 
const courseRouter = Router();


courseRouter.post("/post", (req, res) => {
    const userId = req.userId;
    const courseId = req.courseId; 

    res.json({
        message: "You've bought the course\n Redirecting you to your Dashboard"
    })
})

courseRouter.get("/dashboard", (req, res) => {
    const userId = req.userId;
    const adminId = req.adminId;

    res.json({
        message: "Here's your dashboard"
    });

})

courseRouter.post("/add-course", async (req, res) => {

    const {title, description, price, content } = req.body;
//generate a creatorId for admin when he is creating a course
//this particular creatorId should be same for all his/her courses 
    await courseModel.create({
        title, creatorId, description, price, content
    })

    res.json({
        message: "Your course has been successfully created"
    })
})

courseRouter.patch("/edit-course", (req, res) => {
    const courseId = req.body.courseId;
    const creatorId = req.body.creatorId;
    
    res.json({
        message: "You're changes has been made"
    });
})

courseRouter.delete("/delete-course", (req, res) => {
    const adminId = req.adminId;
    const creatorId = req.body.creatorId;
//validate the creatorId that admin sent with his generated creatorId
    const courseId = req.courseId;

    res.json({
        message: "Removing all your course related contents"
    })
})

module.exports = {
    courseRouter: courseRouter
}