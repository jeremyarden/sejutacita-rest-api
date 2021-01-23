# Simple CRUD API

Simple User CRUD API connected to a database, made in NodeJS and MongoDB.

Capabilities:
- Create User
- Read All and Specific User
- Update Specific User
- Delete All and Specific User

## Architecture
![Referenced Architecture](https://bezkoder.com/wp-content/uploads/2020/02/node-js-mongodb-jwt-authentication-architecture.png)

In this implementation, Bezkoder's architecture was primarily referenced because in my opinion it gives a sufficient security and simple enough to implement. 

The only difference is in this implementation, Bezkoder's monolithic architecture was split into microservices, which in the end will look like the picture below.
![Microservice Architecture](https://i.ibb.co/hDXSXbJ/Untitled-Diagram-14.png)

Microservices aren't supposed to have a shared database, but for the sake of simplicity, this one will use a shared database.
## Flow
![Authentication Flow](https://i.ibb.co/8KQs9pd/Untitled-Diagram-8.png)

Sign-up: client will send a POST request containing username, password, and roles (user, admin) and server will check for existing user inside the database. If user exists, server will send a response containing the error message from Mongoose. If user doesn't exist, new user's details will be saved to the database.

Sign-in: client will send a POST request containing username and password, and server will authenticate with the database. If user details matches, server will create a JWT token, and return a response containing user ID, username, password, and JWT token.

![CRUD Flow](https://i.ibb.co/PjV4kGM/Untitled-Diagram-12.png)
Create User: client will send a POST request containing username, password, and roles (user, admin), with user's JWT token in the header, and server will forward the request to middleware to check if user's authorization suffices. Then, server will check for existing user inside the database. If user exists, server will send a response containing the error message from Mongoose. If user doesn't exist, new user's details will be saved to the database. (this method has the same signature as sign-up method, with the exception that this one require an admin token)

Update User: client will send a PUT request containing the requested changes and updated user's ID, with requesting user's JWT token in the header, and server will forward the request to middleware to check if user's authorization suffices. Then, server will check for existing user and will update the user if it exists.

Delete All User: client will send a DELETE request with user's JWT token in the header, and server will forward the request to middleware to check if user's authorization suffices. Then, server will delete all users in the database.

Delete User: client will send a DELETE request with the ID of the user going to be deleted, with requesting user's JWT token in the header, and server will forward the request to middleware to check if user's authorization suffices. Then, server will check for existing user and will delete the user if it exists.
![CRUD Flow](https://i.ibb.co/0cYnwLR/Untitled-Diagram-13.png)
Read All User: client will send a GET request and server will return all existing users' information
Read User: client will send a GET request with specific user ID as a parameter and server will return requested user's information