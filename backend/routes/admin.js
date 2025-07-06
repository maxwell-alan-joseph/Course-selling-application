const {Router} = require('express');

const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {

    const firsName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.lastName;
    const password = req.body.password;

    res.json({
        message: "you are signed up "
    });
});

adminRouter.post("/login", (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    
    res.json({
        message: "you are logged in"
    });
});

module.exports = {
    adminRouter: adminRouter
}