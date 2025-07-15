const { z } = require('zod'); 

const createCourseSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Title must be at least 10 characters"),
    price: z.number().min(0, "Price must be non-negative"), 
    content: z.string().min(10, "Content is too short")
});

const updateCourseSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Title must be at least 10 characters"),
    price: z.number().min(0, "Price must be non-negative").optional(),
    isPublished: z.boolean().optional()
});

module.exports = {
    createCourseSchema, updateCourseSchema
}