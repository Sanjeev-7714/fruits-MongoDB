# Fruits Database Application - Setup Guide

This guide will help you set up and run the Fruits Database application. The application consists of a React frontend and a Node.js/Express backend with MongoDB for data storage.

## Prerequisites

1. Node.js and npm installed on your system
2. MongoDB installed locally or a MongoDB Atlas account

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure MongoDB:
   - If using a local MongoDB instance, ensure MongoDB is running
   - If using MongoDB Atlas, update the `.env` file with your connection string

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## Using the Application

1. Enter a fruit name in the input field
2. Click the "Add Fruit" button to add it to the database
3. The added fruit will appear in the Fruits Collection list

## Troubleshooting

- If you encounter connection issues with MongoDB, verify your connection string in the `.env` file
- Make sure both frontend and backend servers are running simultaneously
- Check the console for any error messages

## Project Structure

- `frontend/` - React application
  - `src/` - Source code
    - `App.js` - Main application component
    - `App.css` - Styling

- `backend/` - Express server
  - `server.js` - Server configuration and API endpoints
  - `.env` - Environment variables