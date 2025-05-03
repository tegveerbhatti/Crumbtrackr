# Crumbtrackr

Crumbtrackr is a full-stack expense tracking application that allows users to log and manage their income and expenses. The application provides a responsive front-end interface and a secure back-end system for storing and retrieving financial data.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features
- Track income and expenses with an intuitive interface.
- Secure user authentication, including local and Google OAuth sign-ins.
- Real-time expense and income tracking.
- Encrypted storage of user credentials and financial data.
- Responsive design for mobile and desktop views using Tailwind CSS.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Bcrypt for password hashing, Google OAuth for social login
- **API Integration**: Custom REST API for handling transactions

## Installation

### Prerequisites
- Node.js and npm installed on your local machine
- PostgreSQL installed and running

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tegveerbhatti/crumbtrackr.git
   cd crumbtrackr

2. **Install dependencies**: Run the following command to install project dependencies: `npm install`.

3. **Set up environment variables**: Create a `.env` file in the root directory and provide the following environment variables: `DATABASE_URL=your_postgresql_database_url GOOGLE_CLIENT_ID=your_google_oauth_client_id GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret`.

4. **Run the development server**: To start the application, run the command: `npm run dev`.

5. **Set up the PostgreSQL database**: Ensure your PostgreSQL instance is running and execute any necessary SQL scripts to set up the required tables.

## Usage

Once the application is set up, users can: 
- Sign up using local authentication or Google OAuth. 
- Log income and expenses from the dashboard. 
- View a summary of their financial activities in real time.

### Frontend Components
- `App.jsx`: The main entry point for the React application.
- `Dashboard.jsx`: Displays the user's financial summary and allows interaction with the income/expense forms.
- `Form.jsx`: Form component for adding new income or expense entries.
- `Login.jsx`: Handles user authentication, including Google OAuth integration.
- `AuthRedirect.jsx`: Handles OAuth redirect after authentication.

### Backend Components
- `index.js`: The main entry point for the Node.js server.
- `auth.js`: Handles authentication logic using bcrypt and Google OAuth.
- `expense.js`: Manages API routes for handling expense-related operations.
- `income.js`: Manages API routes for handling income-related operations.

## Authentication

The application supports two types of authentication:
1. **Local Authentication**: Users can sign up with a username and password. Passwords are hashed using bcrypt for security.
2. **Google OAuth**: Users can sign in using their Google accounts for a seamless authentication experience.

## API Endpoints
- `POST /api/auth/register`: Register a new user with local authentication.
- `POST /api/auth/login`: Login with local credentials.
- `POST /api/income`: Add a new income entry.
- `POST /api/expense`: Add a new expense entry.
- `GET /api/income`: Retrieve all income entries.
- `GET /api/expense`: Retrieve all expense entries.
