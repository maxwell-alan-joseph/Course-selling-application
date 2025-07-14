const {Router} = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { userModel, adminModel, courseModel } = require("./db");
const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    await adminModel.create({
        email, password, name
    });
    
    res.json({
        message: "You are signed up as an admin"
    });
})

adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    await adminModel.findOne({
        email, password
    })

    res.json({
        message: "You are logged in"
    })
})


module.exports = {
    adminRouter: adminRouter
}