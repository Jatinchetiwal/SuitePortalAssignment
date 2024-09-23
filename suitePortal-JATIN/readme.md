# SuitePortal

SuitePortal is a web application for managing maintenance requests and admin authentication. It consists of a frontend built with Angular and a backend built with Node.js. The application uses `lowdb` for data storage and supports basic admin login functionality and maintenance request management.

## Project Structure

The project is organized as follows:

- `suite-portal/`
  - `suite-portal-frontend/` - Contains the Angular frontend application.
  - `suite-portal-backend/` - Contains the Node.js backend application.
  - `README.md` - This file.

## Features

- **Admin Authentication**: Admins can log in to the system using predefined credentials.
- **Maintenance Requests**: Users can submit maintenance requests, which admins can view and manage.
- **Error Handling**: The system gracefully handles errors and provides appropriate responses.

## Technologies Used

- **Frontend**: Angular 17
- **Backend**: Node.js with Express
- **Database**: Lowdb
- **Testing**: Mocha, Chai, Sinon, Supertest
- **Environment Variables**: Managed using `.env` files

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Angular CLI](https://angular.io/cli) (for frontend development)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/suite-portal.git
   cd suite-portal


2.**Install Dependencies** 

For the frontend:
cd suite-portal-frontend
npm install

For the backend:
cd ../suite-portal-backend
npm install

3.**Run the Application**
To start both the frontend and backend, navigate to the root folder and run:
npm start

4.**Running Tests**:
To run tests for both frontend and backend:
1.Navigate to the Backend Directory:
cd suite-portal-backend
2.Run Backend Tests:
npm test

This will run Mocha tests for the backend API.

3.Navigate to the Frontend Directory:
cd ../suite-portal-frontend
4.Run Frontend Tests:
ng test
This will run Angular tests for the frontend application.



## Backend Dependencies
bcrypt: For hashing passwords.
body-parser: For parsing incoming request bodies.
cors: For enabling Cross-Origin Resource Sharing.
dotenv: For loading environment variables from a .env file.
express: For building the REST API.
lowdb: For local JSON database storage.
sinon: For creating spies, mocks, and stubs in tests.
chai: For assertion library in tests.
mocha: For running tests.
concurrently: ^8.0.1 - For running multiple npm scripts concurrently.
