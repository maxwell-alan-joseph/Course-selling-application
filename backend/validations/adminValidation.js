const { z } = require ('zod');

const adminSignupSchema = z.object({
    name: z.string.min(3, "Name must be at least 3 characters"),
    email: z.string.email("Invalid email format"), 
    password: z.string.min(8, "Password must at least 8 characters")
}); 

const adminLoginSchema = z.object({
    email: z.string.email("Invalid email format"),
    password: z.string.min(8, "Password must be at least 8 characters")
});

module.exports = {
    adminSignupSchema, adminLoginSchema
};