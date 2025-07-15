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

adminRouter.post("/signup", async (req, res) => {
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

adminRouter.post("/login", async (req, res) => {
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




module.exports = {
    adminRouter: adminRouter
}