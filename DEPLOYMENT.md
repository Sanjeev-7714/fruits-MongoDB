# Deployment Guide: Fruits Database Application

This guide provides step-by-step instructions for deploying your Fruits Database application:
- Frontend: Deployed on Vercel
- Backend: Deployed on Render
- Database: MongoDB Atlas

## Part 1: Database Setup with MongoDB Atlas

1. **Create a MongoDB Atlas account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create a new cluster**
   - Select the free tier option (M0)
   - Choose a cloud provider and region closest to your users
   - Click "Create Cluster"

3. **Set up database access**
   - In the left sidebar, go to "Database Access"
   - Click "Add New Database User"
   - Create a username and password (save these securely)
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"

4. **Configure network access**
   - In the left sidebar, go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for simplicity)
   - Click "Confirm"

5. **Get your connection string**
   - Go to "Clusters" in the left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `fruits-database`

## Part 2: Backend Deployment on Render

1. **Prepare your backend code**
   - Create a new file named `render.yaml` in your backend directory with the following content:
     ```yaml
     services:
       - type: web
         name: fruits-database-api
         env: node
         buildCommand: npm install
         startCommand: node server.js
         envVars:
           - key: MONGO_URI
             sync: false
           - key: PORT
             value: 10000
     ```

2. **Create a Render account**
   - Go to [Render](https://render.com/)
   - Sign up for a free account

3. **Create a new Web Service**
   - Click "New +" and select "Web Service"
   - Connect your GitHub/GitLab repository or upload your code
   - Navigate to the backend directory
   - Use the following settings:
     - Name: fruits-database-api
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `node server.js`

4. **Configure environment variables**
   - Scroll down to "Environment Variables"
   - Add the following variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string from Part 1
     - `PORT`: 10000 (Render assigns its own port, but we'll set this as a fallback)

5. **Deploy the backend**
   - Click "Create Web Service"
   - Wait for the deployment to complete
   - Note the URL of your deployed backend (e.g., `https://fruits-database-api.onrender.com`)

## Part 3: Update Frontend API Configuration

1. **Create a production API configuration**
   - In your frontend project, create a new file at `src/config.js` with the following content:
     ```javascript
     const config = {
       apiUrl: process.env.NODE_ENV === 'production'
         ? 'https://your-backend-url.onrender.com' // Replace with your actual Render URL
         : 'http://localhost:5000'
     };
     
     export default config;
     ```

2. **Update your App.js to use the configuration**
   - Modify your API calls to use the config file instead of hardcoded URLs:
     ```javascript
     import config from './config';
     
     // Replace:
     // axios.get('http://localhost:5000/api/fruits');
     // With:
     axios.get(`${config.apiUrl}/api/fruits`);
     ```
   - Make this change for all API calls in your application

## Part 4: Frontend Deployment on Vercel

1. **Create a Vercel account**
   - Go to [Vercel](https://vercel.com/signup)
   - Sign up for a free account

2. **Install Vercel CLI (optional)**
   - Run: `npm install -g vercel`

3. **Deploy using Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub/GitLab repository or upload your code
   - Navigate to the frontend directory
   - Configure project:
     - Framework Preset: Create React App
     - Build Command: `npm run build`
     - Output Directory: `build`
     - Install Command: `npm install`

4. **Configure environment variables (if needed)**
   - If you're using environment variables in your frontend, add them in the Vercel project settings

5. **Deploy the frontend**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Vercel will provide you with a URL for your deployed frontend

## Part 5: Testing Your Deployment

1. **Test the frontend-backend connection**
   - Open your deployed frontend URL
   - Try adding a new fruit to verify the connection to the backend
   - Check that existing fruits are loaded from the database

2. **Troubleshooting**
   - If you encounter CORS issues, ensure your backend has proper CORS configuration:
     ```javascript
     // In server.js
     app.use(cors({
       origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000']
     }));
     ```
   - Check Render and Vercel logs for any deployment errors

## Part 6: Setting Up Continuous Deployment

1. **Connect your repository**
   - Both Vercel and Render support automatic deployments from Git repositories
   - Connect your repository to enable automatic deployments when you push changes

2. **Configure build settings**
   - Ensure your build settings are correctly configured for both services

3. **Set up environment variables**
   - Make sure all necessary environment variables are configured in both platforms

Congratulations! Your Fruits Database application is now deployed and accessible from anywhere.