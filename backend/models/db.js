const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: type},
    password: String, 
    name: String
})

const adminSchema = new Schema({
    email: {type: String, unique: type},
    creatorId: ObjectId,
    password: String, 
    name: String
})

const courseSchema = new Schema({
    userId: ObjectId, 
    adminId: ObjectId,
    title: String,
    description: String,
    price: Number,
    content: String
})

const userModel = mongoose.model("userDb", userSchema);
const adminModel = mongoose.model("adminDb", adminSchema);
const courseModel = mongoose.model("courseDb", courseSchema);

module.exports = {
    userModel, adminModel, courseModel
}