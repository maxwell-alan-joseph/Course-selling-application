# Course Selling Application

## Step-by-Step 

- Initialize node.js
- Route skeleton for user 
    - signup (POST)
    - login (POST)
    - purchase a course (POST)
    - sees all courses (GET)
    - sees purchased courses (GET)
- Route skeleton for admin 
    - signup (POST)
    - login (POST)
    - create a course (POST)
    - delete a course (DELETE)
    - change course content (PUT)
- Using express routing to structure better routes
- Defining schema for user && admin
    - user.js - name, email, password, purchased course
    - admin.js - name, email, password, 
    - course.js - title, description, price, createdBy,content
    - purchase.js - userId, courseId, purchaseDate

- Adding a db - using dotenv file to store db connection string
- Middlewares for user && admin for authentication 
    - using cookies instead of JWT for auth
    - adding rate limiting middlewares 
- Completing routes for user && admin
- Create a Frontend 

