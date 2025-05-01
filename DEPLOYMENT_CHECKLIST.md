# Deployment Checklist for Fruits Database Application

## Backend (Render.com)

- [ ] Ensure your backend is deployed on Render.com with the URL: `https://fruits-database-api.onrender.com`
- [ ] Verify that all environment variables are set in Render dashboard:
  - [ ] `MONGO_URI`: Your MongoDB Atlas connection string
  - [ ] `PORT`: 10000 (Render will use its own port, but this is a fallback)
- [ ] Check Render logs for any errors
- [ ] Test your backend API directly by visiting: `https://fruits-database-api.onrender.com/api/fruits`

## Frontend (Vercel)

- [ ] Ensure your frontend is deployed on Vercel with the URL: `https://fruits-mongo-db.vercel.app`
- [ ] Verify that the build process completed successfully in Vercel dashboard
- [ ] Check that the frontend is correctly configured to use the production backend URL

## Connection Issues

### If your frontend can't connect to the backend:

1. **CORS Issues**:
   - We've fixed the CORS configuration by removing the trailing slash from the allowed origin
   - Make sure to redeploy your backend after this change

2. **API URL Issues**:
   - Verify that the actual URL of your Render backend matches what's in your frontend config.js file
   - If your Render URL is different, update the config.js file and redeploy the frontend

3. **MongoDB Connection**:
   - Ensure your MongoDB Atlas cluster is properly configured and accessible
   - Check that the IP access list in MongoDB Atlas includes `0.0.0.0/0` to allow connections from anywhere

## Redeployment Steps

### Backend (Render):
1. Push your changes to your GitHub repository
2. Render should automatically redeploy if you've set up auto-deploy
3. Alternatively, manually redeploy from the Render dashboard

### Frontend (Vercel):
1. Push your changes to your GitHub repository
2. Vercel should automatically redeploy if you've set up auto-deploy
3. Alternatively, manually redeploy from the Vercel dashboard

## Testing After Deployment

1. Open your Vercel frontend URL in a browser
2. Try to add a new fruit
3. Verify that existing fruits are loaded
4. If issues persist, check browser console for error messages