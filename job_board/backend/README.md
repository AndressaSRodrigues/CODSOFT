# Job Search API

## Project Overview

The Job Search API is a backend service designed for a job search website. It facilitates user registration, authentication, and management operations. Built using MongoDB, Mongo Atlas, Mongoose, Express, and Node.js, the API offers a robust and scalable solution for handling user data securely.

## Endpoints

### Authentication

1. **Register a new user**
   - **Endpoint:** `POST /register`
   - **Description:** Allows users to create a new account with a specified role (person or company), name, email, and password.

2. **Login**
   - **Endpoint:** `POST /login`
   - **Description:** Authenticates users by verifying email and password, returning a JWT token upon successful authentication.

### User Management

1. **Get user information**
   - **Endpoint:** `GET /user/:email`
   - **Description:** Retrieves user information based on the provided email address.
   - **Middleware:** `isOwnUser`

2. **Delete user**
   - **Endpoint:** `DELETE /user/:email`
   - **Description:** Deletes a user account based on the provided email address.
   - **Middleware:** `isOwnUser`

3. **Update user**
   - **Endpoint:** `PATCH /user/:email`
   - **Description:** Updates user information (role, name, password) based on the provided email address.
   - **Middleware:** `isOwnUser`

### Jobs

1. **Find All Jobs**
    - **Endpoint**: `GET /jobs`
    - **Description:** Retrieves all job listings.

2. **Create a Job**
    - **Endpoint:** `POST /job`
    - **Description:** Creates a new job listing.
    - **Middleware:** `isCompany`

3. **Get Job by ID**
    - **Endpoint:** `GET /job/:id`
    - **Description:** Retrieves a specific job listing by its ID.

4. **Get Jobs by Company**
    - **Endpoint:** `GET /jobs/:company`
    - **Description:** Retrieves job listings created by a specific company.

5. **Delete a Job**
    - **Endpoint:** `DELETE /job/:id`
    - **Description:** Deletes a specific job listing by its ID (requires company role).
    - **Middleware:** `isOwnJob`

6. **Update a Job**
    - **Endpoint:** `PATCH /job/:id`
    - **Description:** Updates a specific job listing by its ID (requires company role).
    - **Middleware:** `isOwnJob`

## Models

### Users Schema

**Required information to create a user**
    - Name
    - Role (person or company)
    - Email
    - Password

### Jobs Schema

**Required information to create a job**
    - Title
    - Company
    - Level (internship, junior, mid, senior)
    - Location
    - Modality (remote, hybrid, office)
    - Description
    - Salary
    - StartDate

## Middleware

Middleware functions play a crucial role in enhancing the security and functionality of the API.

1. **Check User Role Middleware**
   - **Middleware:** `isCompany or isPerson`
   - **Description:** Verifies the JWT token in the Authorization header, ensuring the user has the specified role (person or company) to access protected routes. Only the users registered as 'company' can post jobs.

2. **Check User Email Middleware**
    - **Middleware:** `isOwnUser`
    - **Description:** Verifies the JWT token and checks if the user's email in the token matches the requested email, providing authorization for accessing and modifying their own user information or deleting their account.

3. **Check Job Company Middleware**
    - **Middleware:** `isOwnJob`
    - **Description:** Verifies the JWT token and checks if the user/company's ID in the token matches the requested job createdBy, providing authorization for accessing and modifying the job information or deleting it.

These middleware functions enhance security by ensuring that only authorized users with valid tokens can access certain routes and perform specific actions. The combination of these endpoints and middleware makes the Job Search API a secure and user-friendly backend for a job search website.
