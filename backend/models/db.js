const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: type, required: true, lowercase: true},
    password: {type: String, required: true, minlength: 8}, 
    name: { type: String, required: true},
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    timestamps: true
});

userSchema.pre('save', async (next) => {
    if (!this.isModified('password')) 
        return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

const adminSchema = new Schema({
    email: {type: String, unique: type, required: true, lowercase: true},
    password: {type: String, required: true, minlength: 8},
    name: {type: String, required: true},
    timestamps: true
});

adminSchema.pre('save', async (next) => {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

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