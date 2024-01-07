# QuizHub - Quiz Maker and Taker API

## Project Overview

The Quiz Maker and Takes API is a backend service designed for a quiz website. It includes user registration and authentication through usernames and passwords, and facilicates de creation of quizzes. It was built using MongoDB, Mongo Atlas, Mongoose, Express, and Node.js. It includes the usage of JWT and bcrypt.

## Endpoints

### Authentication

1. **Register a new user**
   - **Endpoint:** `POST /register`
   - **Description:** Allows users to create a new account with username and password.

2. **Login**
   - **Endpoint:** `POST /login`
   - **Description:** Authenticates users by verifying username and password, returning a JWT token upon successful authentication.

### Quizzes

1. **Get all quizzes**
   - **Endpoint:** `GET /quiz`
   - **Description:** Retrieves all quizzes from the database.
   - **Middleware:** `userAuth`

2. **Get quiz by ID**
   - **Endpoint:** `GET /quiz/:id`
   - **Description:** Retrieves one specific quiz based on its ID.
   - **Middleware:** `userAuth`

3. **Get quizzes create by user**
   - **Endpoint:** `GET /quiz/user/:username`
   - **Description:** Retrieves the quizzes created by one specific user based on its username.
   - **Middleware:** `userAuth`

4. **Create a new quiz**
   - **Endpoint:** `POST /quiz`
   - **Description:** Sends a new quiz.
   - **Middleware:** `userAuth`

5. **Delete quiz**
   - **Endpoint:** `DELETE /quiz/:id`
   - **Description:** Deletes a quiz based on its ID.
   - **Middleware:** `userAuth`

## Models

### User Schema

1. **Required information to create a user**
    - Username
    - Password

### Question Schema

1. **Required information to create a question**
    - Text
    - Options
    - Correct option index

### Quiz Schema

1. **Required information to create a quiz**
    - Title
    - Theme
    - Questions
    - Created By
    - Created At

## Middleware

Middleware functions play a crucial role in enhancing the security and functionality of the API.

1. **Check Authenticated User**
   - **Middleware:** `userAuth`
   - **Description:** Ensures there is a user logged in and verifies the JWT token in the Authorization header.
