const express = require('express');
const app = express();
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin")

app.use("/api/v1/user", userRouter);

app.use("/api/v1/admin", adminRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})