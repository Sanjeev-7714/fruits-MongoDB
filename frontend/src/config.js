/**
 * API Configuration
 * 
 * This file provides configuration for API endpoints based on the current environment.
 * In development, it uses localhost.
 * In production, it uses the deployed backend URL.
 */

const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://fruits-database-api.onrender.com' // Ensure this matches your actual Render URL
    : 'http://localhost:5000'
};

export default config;