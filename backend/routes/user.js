const { Router } = require('express');
const userRouter = Router();


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

    await userModel.findOne ({
        email, password
    })

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