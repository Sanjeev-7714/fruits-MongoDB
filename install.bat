@echo off
echo ===================================
echo Fruits Database Application Setup
echo ===================================
echo.

echo Installing backend dependencies...
cd backend
npm install
echo Backend dependencies installed successfully!
echo.

echo Installing frontend dependencies...
cd ../frontend
npm install
echo Frontend dependencies installed successfully!
echo.

echo ===================================
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Start MongoDB service
echo 2. Open two command prompts
echo 3. In the first one, run: cd backend && npm start
echo 4. In the second one, run: cd frontend && npm start
echo 5. Open your browser at http://localhost:3000
echo ===================================
echo.
pause