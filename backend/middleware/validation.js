const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) { 
            return res.status(400).json({
                message: "validation failed", 
                errors: err.errors.map( err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }
    };
};

module.exports = {
    validateRequest
};