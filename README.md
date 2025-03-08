# Login System with Role-Based Access & Google OAuth

This is a full-stack authentication system built with **Next.js** for the front-end and **NestJS** for the back-end. The system supports user registration, login, Google OAuth authentication, and role-based access control (RBAC) to manage user permissions.

## Features ✨
- **User Registration**: Allow users to sign up using their email and password.
- **User Login**: Users can log in with their credentials (email and password).
- **Google OAuth Login**: Enable users to log in via their Google account, streamlining the authentication process.
- **Role-Based Access Control (RBAC)**: Define different roles (e.g., admin, user) and restrict access based on the user’s role.
- **Next.js Front-End**: Built with Next.js, a popular React framework, to provide a fast and dynamic user interface.
- **NestJS Back-End**: A scalable and maintainable back-end built using NestJS to handle authentication and role-based access.

## Tech Stack 💻
- **Frontend**: Next.js
- **Backend**: NestJS
- **Database**: [Specify your database, e.g., PostgreSQL, MongoDB, etc.]
- **Authentication**: JWT (JSON Web Tokens) & Google OAuth
- **OAuth Provider**: Google
- **Role Management**: Custom role-based access control

## Installation 🚀

To set up the project locally, follow these steps:

### 1. Clone the repository:
```bash
git clone https://github.com/AT74PH0L/Auth-System.git
cd Auth-System
```

### 2. Install dependencies for Frontend:
Navigate to the **frontend** folder and install the required dependencies:
```bash
cd frontend
npm install
```

### 3. Install dependencies for Backend:
Navigate to the **backend** folder and install the required dependencies:
```bash
cd backend
npm install
```

### 4. Environment Configuration:
Create a `.env` file in both the **frontend** and **backend** directories to configure your environment variables. Here are a few things you'll need to set:

- Google OAuth credentials (client ID and client secret)
- JWT secret for signing tokens
- Database connection string
- Any other necessary configuration for your system

For Google OAuth, set up your credentials in the [Google Developer Console](https://console.developers.google.com/) and add them to your `.env` file.

### 5. Running the application:
- Start the backend server:
  ```bash
  cd backend
  npm run start:dev
  ```

- Start the frontend server:
  ```bash
  cd frontend
  npm run dev
  ```

The app will run at `http://localhost:3000` for the frontend, and the backend will typically be available at `http://localhost:3001`.

## Usage 👨‍💻

1. **User Registration**: Create a new user account with email and password.
2. **User Login**: Log in using your email/password or through Google OAuth.
3. **Role-Based Access**: After logging in, the system will check your role (e.g., admin, user). 
    - **Admin Role**: Admins will have access to additional features or resources.
    - **User Role**: Regular users will have access to basic functionalities.

The role of each user is managed on the backend, and the frontend will adjust the UI based on the user's role.

## API Documentation 📝

The backend exposes the following API endpoints:

- **POST /user/register**: Register a new user with email and password.
- **POST /auth/login**: Login with email and password.
- **POST /auth/google**: Login via Google OAuth.
- **GET /user/profile**: Get information about the currently authenticated user, including role information.
- **GET /auth/role**: (Admin-only) Fetch a list of all users.

### Role-Based Access
- Roles are defined as part of the user model in the backend. Common roles include:
  - **Admin**: Can manage users, roles, and all aspects of the system.
  - **User**: Regular user with limited access, typically used for normal operations.
  
Roles can be expanded to suit your project needs.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Google OAuth](https://developers.google.com/identity)
- [JWT Authentication](https://jwt.io/)
- [Role-Based Access Control](https://auth0.com/docs/authorization/rbac)

---
