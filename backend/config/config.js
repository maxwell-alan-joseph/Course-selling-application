const dotenv = require('dotenv');
dotenv.config();
 
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb: //localhost:27017/course-selling-app',
    PORT: process.env.PORT || 3000
}