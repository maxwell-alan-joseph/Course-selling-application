const express = require('express');
const app = express();
const { userRouter } = require("./routes/user");


app.use("/api/v1/user", userRouter);


app.post("/admin/signup", (req, res) => {

});

app.post("/admin/signup", (req, res) => {

});

app.post("/admin/login", (req, res) => {

});

app.delete("/admin/delete-course", (req, res) => {

});

app.put("/admin/change-course", (req, res) => {

});