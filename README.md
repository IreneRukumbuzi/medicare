# Medicare Application

## Overview
The Medicare Application is a web-based platform designed to manage user profiles for a medical care system. The application allows users to sign up, log in, and update their profile information including their ID number, phone number, address, nationality, education level, marital status, and birthday.

## Features
- **User Registration**: Allows new users to create an account.
- **User Login**: Enables existing users to log in to the application.
- **Profile Management**: Users can view and update their profile information.
- **Authentication**: Secure login and registration using JWT (JSON Web Tokens).

## Technologies Used

### Frontend
- React
- Ant Design
- Axios
- Day.js

### Backend
- Spring Boot
- Spring Security
- JWT for authentication
- MySQL for database

## Prerequisites
- Node.js
- npm (Node Package Manager)
- Java JDK 11 or higher
- MySQL

## Getting Started

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/IreneRukumbuzi/medicare.git
    cd medicare
    ```

2. Configure MySQL database:
    - Create a new database in MySQL.
    - Update the `application.yaml` file with your database details.

3. Add a `.env` file in the root directory and add the following:
    ```bash
    DB_URL=jdbc:mysql://localhost:3306/your-database-name
    DB_USERNAME=your-database-username
    DB_PASSWORD=your-database-password
    ```

4. Build and run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add your API base URL:
    ```bash
    REACT_APP_BASE_URL=http://localhost:8080
    ```

4. Start the React application:
    ```bash
    npm start
    ```

## Usage
1. Open your web browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with an existing account.
3. Update your profile information from the profile page.
