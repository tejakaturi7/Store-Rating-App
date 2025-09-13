# MERN Store Ratings Application

This is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack that allows users to rate stores. It features a robust authentication system with different user roles (System Administrator, Normal User, Store Owner), each having distinct functionalities.
## Features

-   **User Authentication:** Secure login and registration for different user roles.
-   **Role-Based Access Control:** Different dashboards and functionalities based on user roles.
-   **Store Management:** Admins and Store Owners can manage store information.
-   **Store Ratings:** Users can view, submit, and modify 1-5 star ratings and comments for stores.
-   **Dashboard Views:** Dedicated dashboards for Admin, Normal User, and Store Owner.
-   **Dynamic Content:** Real-time data fetching and display.
-   **Initial Home Page:** A landing page with options for different user types to register or log in.

## Tech Stack

**Backend:**
-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** Web application framework for Node.js.
-   **MongoDB:** NoSQL database.
-   **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
-   **bcryptjs:** For password hashing.
-   **jsonwebtoken:** For creating and verifying JWTs for authentication.
-   **dotenv:** For managing environment variables.
-   **cors:** For enabling Cross-Origin Resource Sharing.

**Frontend:**
-   **React.js:** JavaScript library for building user interfaces.
-   **React Router DOM:** For declarative routing in React applications.
-   **Axios:** Promise-based HTTP client for making API requests.
-   **HTML/CSS:** For structure and basic styling.

## Project Structure

The project is divided into two main parts: `backend` and `frontend`.


MERN-Store-Ratings/
├── backend/
│   ├── controllers/         \# Handles request logic (auth, user, store, rating)
│   ├── models/              \# Defines Mongoose schemas (User, Store, Rating)
│   ├── routes/              \# API routes definitions
│   ├── middleware/          \# Authentication and role-checking middleware
│   ├── config/              \# Database connection setup
│   ├── .env                 \# Environment variables
│   └── server.js            \# Entry point for the backend server
│
└── frontend/
├── public/              \# Static assets (e.g., index.html)
├── src/
│   ├── components/      \# Reusable React components (Navbar, StoreCard)
│   ├── pages/           \# Main application pages (HomePage, Login, Register, Dashboards for Admin/User/StoreOwner, StoreOwnerLogin, StoreOwnerRegister)
│   ├── services/        \# API integration (axios instance)
│   ├── App.js           \# Main React component, handles routing
│   ├── index.js         \# Entry point for the React app
│   └── App.css          \# Global CSS styling
└── package.json         \# Frontend dependencies and scripts


## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:
-   **Node.js** (LTS version recommended)
-   **npm** (comes with Node.js)
-   **MongoDB** (running locally or accessible via a cloud service like MongoDB Atlas)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd MERN-Store-Ratings/backend
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory (at `MERN-Store-Ratings/backend/.env`) and add your environment variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/mernstoreratings  # Or your MongoDB Atlas URI (e.g., 'mongodb+srv://user:pass@cluster.mongodb.net/mernstoreratings?retryWrites=true&w=majority')
    JWT_SECRET=a_very_strong_and_random_secret_key_here  # Generate a strong, random key for JWT signing
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd MERN-Store-Ratings/frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

## Running the Application

1.  **Start the Backend Server:**
    Open a new terminal, navigate to the `backend` directory (`MERN-Store-Ratings/backend`), and run:
    ```bash
    npm start
    # For development with hot-reloading (if you set it up in package.json with 'nodemon server.js'):
    # npm run dev
    ```
    You should see "MongoDB Connected" and "Server running on port 5000" messages in your console.

2.  **Start the Frontend Development Server:**
    Open another new terminal, navigate to the `frontend` directory (`MERN-Store-Ratings/frontend`), and run:
    ```bash
    npm start
    ```
    This will open the application in your default web browser at `http://localhost:3000`. The initial page loaded will be the `HomePage`.

## User Roles and Functionalities

The application supports three distinct user roles, each with specific access rights and dashboard views.

### System Administrator

-   **Login:** Dedicated login for administrators.
-   **Dashboard:**
    -   Displays total number of users, stores, and submitted ratings.
    -   **User Management:** Can add new normal users, store owners, and other admin users. Can view a comprehensive list of all users (Name, Email, Address, Role).
    -   **Store Management:** Can view a list of all registered stores (Name, Email, Address, Owner Name, Overall Rating).
    -   **Filtering & Sorting:** Apply filters on user and store listings (e.g., by Name, Email, Address, Role) and sort tables by key fields.
    -   Can view details of all users. If the user is a Store Owner, their average store rating will also be displayed.

### Normal User

-   **Registration & Login:** Standard user signup and login via the Home Page.
-   **Password Update:** Can update their own password after logging in.
-   **Store Browsing:** View a list of all registered stores.
    -   Store listings display: Store Name, Address, Overall Rating, and the user's own submitted rating (if any).
    -   **Search:** Search for stores by Name and Address.
-   **Rating System:**
    -   Option to submit a rating (1-5 stars) and comment for individual stores.
    -   Option to modify their previously submitted rating.

### Store Owner

-   **Registration & Login:** Dedicated registration and login via the Home Page.
-   **Password Update:** Can update their own password after logging in.
-   **Dashboard:**
    -   **Store Management:** Can add new stores.
    -   Can view a list of only the stores they have created.
    -   View a list of users who have submitted ratings for their store.
    -   See the average rating of each of their stores.

## API Endpoints (Backend)

The backend provides the following API endpoints, protected by authentication and role-based middleware where necessary:

-   **Authentication (`/api/auth`)**
    -   `POST /api/auth/register`: Register a new user (admin, user, storeowner).
    -   `POST /api/auth/login`: Log in a user.

-   **Users (`/api/users`)**
    -   `GET /api/users` (Admin only): Get all users.
    -   `GET /api/users/:id` (Admin only): Get user by ID.
    -   `PUT /api/users/update-password` (Authenticated user): Update current user's password.
    -   `POST /api/users` (Admin only): Add a new user (admin can create any role).

-   **Stores (`/api/stores`)**
    -   `GET /api/stores` (Authenticated): Get all stores (includes owner info).
    -   `POST /api/stores` (Store Owner only): Create a new store.
    -   `GET /api/stores/:id` (Authenticated): Get a single store by ID.
    -   `GET /api/stores/:id/ratings` (Authenticated): Get average rating and all ratings for a specific store.

-   **Ratings (`/api/ratings`)**
    -   `POST /api/ratings` (Authenticated user): Add a new rating or update an existing one for a store.
    -   `GET /api/ratings/:storeId` (Authenticated user): Get all ratings for a specific store.

## Form Validations

The application implements the following validations for user input:

-   **Name:** Minimum 20 characters, Maximum 60 characters.
-   **Address:** Maximum 400 characters.
-   **Password:** 8-16 characters, must include at least one uppercase letter and one special character.
-   **Email:** Must follow standard email validation rules (e.g., `user@example.com`).

## Future Enhancements

-   Implement robust error handling and user feedback beyond simple `alert()` messages.
-   Add more advanced filtering and sorting options in dashboards, especially for the Admin.
-   Pagination for lists of users, stores, and ratings.
-   Improved UI/UX with a more modern design framework (e.g., Material-UI, Chakra UI, Tailwind CSS).
-   Advanced search functionality.
-   Profile management for users (e.g., update name, address).
-   Delete functionality for Admin users (users, stores).
-   Robust validation in frontend forms with immediate feedback.

## License

This project is open-source and available under the [MIT License](LICENSE).
