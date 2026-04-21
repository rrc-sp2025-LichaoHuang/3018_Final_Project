# 3018_Final_Project

Dark Angels Secret Archive API

This project is a RESTful API built with Node.js, Express, and TypeScript. It simulates a secure archive system where users can manage secret files with role-based access control (RBAC). Firebase Authentication is used to verify users and assign roles.

Features
User authentication using Firebase ID Token
Role-based access control (Brother, Master, Inner Circle, Primarch)
CRUD operations for files
File upload using Multer (images and PDF)
File validation (type and size limit)
Swagger API documentation
Basic unit testing with Jest
API Endpoints
File Management
GET /api/v1/files - Get all files
GET /api/v1/files/:id - Get file by ID
POST /api/v1/files - Create a new file
PUT /api/v1/files/:id - Update file
DELETE /api/v1/files/:id - Delete file
File Upload
POST /api/v1/upload - Upload image or document
Admin
POST /api/v1/admin - Assign role to user
Authentication

All protected routes require a Firebase ID Token.

Example header:

Authorization: Bearer <your_token>
File Upload
Supported types: JPG, PNG, PDF
Max file size: 5MB
Files are stored in /uploads folder
Swagger Documentation

You can access API documentation at:

http://localhost:3000/api-docs
Installation
npm install
npm start
Testing
npm test

Basic CRUD operations are tested using Jest and Supertest.
