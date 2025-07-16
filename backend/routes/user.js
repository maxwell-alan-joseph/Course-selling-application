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
        console.log(`${err}`);
        res.status(500).json({
            message: "Server Error",
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

userRouter.get("/courses", async (req, res) => {

    try{
        const courses = await courseModel.find({
            isPublished: true
        })
        .populate('createdBy', 'name email')
        .select('-content');

        res.json({
            message: "Courses fetched successfully",
            courses
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

userRouter.get("/purchased-courses", userAuthMiddleware, async(req, res) => {
    try {
        const user = await userModel.findById(req.userId)
        .populate('purchasedCourses')
        .select('purchasedCourses');

        res.json({
            message: "Purchased courses fetched successfully",
            purchaseCourses: user.purchaseCourses
        });

    } catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
});

userRouter.post("/purchase", userAuthMiddleware, validateRequest(purchaseSchema), async (req, res) => {
    try {
        const { courseId } = req.body; 
        const userId = req.userId; 

        const course = await courseModel.findById(courseId);
        if(!course){
            return res.json(401).json({
                message: "course not found"
            });
        }

        const user = await userModel.findById(userId);
        if(user.purchaseCourses.includes(courseId)) {
            return res.status(401).json({
                message: "You have already purchased this course"
            });
        }

        setTimeout(async () => {
            try {
                await userModel.findByIdAndUpdate(userId, {
                    $addToSet: {
                        purchasedCourses: courseId
                    }
                });

                res.json({
                    message: "congratulations on buying the course! Happy Learning!",
                    courseId: courseId,
                    courseName: course.title,
                    redirectUrl: "/courses"
                });
            } catch (err) {
                res.status(500).json({
                    message: "Purchased failed"
                })
            }
        }, 3000);

    } catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
})

module.exports = {
    userRouter: userRouter
};