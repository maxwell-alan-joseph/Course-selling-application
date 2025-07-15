const { Router } = require('express');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { userModel, courseModel } = require("../models/db");
const { userAuthMiddleware } = require("../middleware/auth");
const { validateRequest } = require("../middleware/validation");
const { userSignupSchema, userLoginSchema, purchaseSchema } = require("../validations/userValidation");
const { JWT_SECRET } = require("../config/config");

const userRouter = Router();


userRouter.post("/signup", validateRequest(userSignupSchema), async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const user = await userModel.create({
            name, email, password
        });

        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);

        res.status(200).json({
            message: "User created successfully",
            token, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        });
    }

});

userRouter.post("/login", validateRequest(userLoginSchema),  async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(401).json({
                message: "You don't have an account try signing up first"
            })
        }

        const isPasswordValid = await bcrpyt.compare(password, user.password);
        if(!isPasswordValid){
            return  res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);
        
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

userRouter.post("/courses", async (req, res) => {
 //if the userId has the valid token and if the courseId from the course-db is true then await him on a buffer page for 5 seconds and redirect
 //him to the notification page saying "Congratulations on the course! Happy learning"

    const userId = req.userId;
    const courseId = req.body.courseId;

    if(!courseId) {
        return res.status(400).json({
            message: "course Id required"
        })
    }

//checking if course exists 
    const course = await courseModel.findById(courseId);
    if(!course) {
        return res.status(400).json({
            message: "course not found"
        })
    }

    setTimeout( async () => {
        //adding courseId to user's purchased courses
        await userModel.findByIdAndUpdate(userId, {
            $addToSet: { purchasedCourses: courseId}
        });
        
     
     res.json({
        message: "Congratulation on buying the course ! Happy Learning!",
        courseId: courseId,
        courseName: course.title,
        redirectUrl: "/courses"
        });
    }, 3000);
});


module.exports = {
    userRouter: userRouter
}