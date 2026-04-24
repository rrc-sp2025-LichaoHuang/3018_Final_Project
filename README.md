# Dark Angels Secret Archive API

A secure backend API built with Node.js, Express, and TypeScript. This project implements role-based access control, file management features, and secure API practices using Firebase.

## Features

- RESTful API with CRUD operations
- Role-Based Access Control (RBAC)
- Firebase Firestore and Storage integration
- File upload support (Multer + Firebase Storage)
- API documentation with Swagger (OpenAPI)
- Security middleware (Helmet, CORS)
- Environment variable management with dotenv
- Unit and integration testing with Jest and Supertest

## Project Structure


src/
├── api/v1/
│ ├── controllers/
│ ├── services/
│ ├── routes/
│ ├── middleware/
│ ├── configs/
│ └── validation/
├── constants/
├── tests/
├── app.ts
└── server.ts


## Authentication and Authorization

This API uses Firebase Authentication and custom role-based authorization.

Roles:
- Brother
- Master
- InnerCircle
- Primarch

Access control is enforced using middleware to restrict access based on user roles.

## Installation


npm install


## Environment Variables

Create a `.env` file in the root directory:


NODE_ENV=development
PORT=3000

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

ALLOWED_ORIGINS=http://localhost:3000


Ensure `.env` is included in `.gitignore`.

## Running the Server


npm start


Server runs at:


http://localhost:3000


## API Documentation

Full API documentation is available via Swagger:


http://localhost:3000/api-docs


## Running Tests


npm test -- --runInBand


Test coverage includes:
- CRUD operations
- Authentication handling
- Sorting functionality
- Error handling (404, invalid input)

Approximate coverage:

~70% overall coverage


## Security Features

- Helmet.js for HTTP security headers
- CORS configuration for controlled access
- Environment variables for sensitive data
- Firebase Admin SDK for secure backend operations

## Testing Approach

Tests were implemented using Jest and Supertest.

- Authentication is simulated using mocked middleware
- Firebase interactions are mocked
- Focus is on core API behavior and business logic

Note: File upload functionality was tested manually using Postman due to file streaming limitations in Jest.

## Author

Lichao Huang  
RRC Polytech – Application Development and Delivery

## License

This project is for academic purposes.