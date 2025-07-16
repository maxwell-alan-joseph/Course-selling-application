const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminModel, courseModel } = require("../models/db");
const { adminAuthMiddleware }  = require("../middleware/auth");
const { validateRequest } = require("../middleware/validation");
const { adminSignupSchema, adminLoginSchema } = require("../validations/adminValidation");
const { createCourseSchema, updateCourseSchema } = require("../validations/courseValidation");
const { JWT_SECRET } = require("../config/config");

const adminRouter = Router();

adminRouter.post("/signup", validateRequest(adminSignupSchema), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(401).json({
                message: "Admin already exists"
            });
        }

        const admin = await adminModel.create({
            name, email, password
        }); 

        const token = jwt.sign({
            id: admin._id
        }, JWT_SECRET);

        res.status(201).json({
            message: "admin created successfully", 
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }

});

adminRouter.post("/login", validateRequest(adminLoginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });
        if(!admin) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare( password, admin.password);
        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: admin._id
        }. JWT_SECRET);

        res.json({
            message: "login successful", 
            token, 
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
});

adminRouter.post("/courses", adminAuthMiddleware, validateRequest(createCourseSchema), async (req, res) => {
    try {
        const { title, description, price, content } = req.body;
        const adminId = req.adminId; 

        const course = await courseModel.create({
            title, description, price, content,
            createdBy: adminId
        });

        res.status(201).json({
            message: "course created successfully",
            course
        });
    } catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
});

adminRouter.put("/courses/:courseId", adminAuthMiddleware, validateRequest(updateCourseSchema), async (req, res) => {
    try {
        const { courseId } = req.params;
        const adminId = req.adminId;
        const updateData = req.body;

        //checking if course exists and belongs to admin
        const course = await courseModel.findOne({
            _id: courseId, createdBy: adminId
        });
        if(!course){
            return res.status(400).json({
                message: "course not found or unauthorized"
            });
        }

        const updatedCourse = await courseModel.findByIdAndUpdate(
            courseId, updateData, 
            {new: true, runValidators: true}
        );

        res.json({
            message: "course updated successfully",
            course: updatedCourse
        });
    } catch (err) {
        res.status(500).json({
            message: "server error"
        })
    }
});


adminRouter.delete("/courses/:courseId", adminAuthMiddleware, async (req, res) => {
    try {
        const { courseId } = req.params;
        const adminId = req.adminId;

        const course = await courseModel.findOne({
            _id: courseId, 
            createdBy: adminId
        });
        if(!course){
            return res.status(400).json({
                message: "course not found or unauthorized "
            });
        }

        await courseModel.findByIdAndDelete(courseId);
        
        res.json({
            message: "course deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
});



module.exports = {
    adminRouter: adminRouter
};