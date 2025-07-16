const { z } = require('zod');

const userSignupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 Characters"),
    email: z.string().email("Invalid email format"), 
    password: z.string().min(8, "Password must be at least 8 characters")
});

const userLoginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

const purchaseSchema = z.object({
    courseId: z.string().length(12, "Invalid course ID format")
});

module.exports= {
    userSignupSchema, userLoginSchema, purchaseSchema 
}