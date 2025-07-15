const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require("../config/config");
const { userModel, adminModel } = require("../models/db");

const userAuthMiddleware =  async (req, res, next) => {

    try{
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if( !user ) {
            return res.status(401).json({
                message: "Token Invalid"
            })
        }

        req.userId = decoded.id;
        req.user = user;
        next();

    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

const adminAuthMiddleware = async (req, res, next) => {
    
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if(!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const admin = await adminModel.findById(decoded.id);

        if(!admin){
            return res.status(401).json({
                message: "Invalid Token"
            });
        }

        req.adminId = decoded.id;
        req.admin = admin;
        next();

    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = {
    userAuthMiddleware, adminAuthMiddleware
};