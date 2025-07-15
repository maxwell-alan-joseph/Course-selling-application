const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { MONGODB_URI, PORT } = require("./config/config");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

mongoose.connect(MONGODB_URI)
    .then( () => {
        console.log("connected to Database");

        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`);
        });
    })
    .catch( (err) => {
        console.error(`Database connection error: ${err}`);
        process.exit(1);
    });