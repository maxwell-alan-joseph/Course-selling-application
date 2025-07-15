const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true, required: true, lowercase: true},
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
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    content: {type: String, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true}, 
    isPublished: {type: Boolean, default: true},
    timestamps: true
})



const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);

module.exports = {
    userModel, adminModel, courseModel
}