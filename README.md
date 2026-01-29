# Smart_Career_Web_Assistant

A full-stack web application to help users manage resumes, track job applications, analyze skills, and monitor career progress.

# Frontend

## Tech Stack

**Frontend:**
- React 18 + Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

**Backend:**
- Flask (Python)
- MongoDB Atlas

## Project Structure

```
Smart_Career_Web_Assistant/
├── frontend/          # React + Vite frontend
└── backend/           # Flask backend
```

## Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Create `backend/.env`:
```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```

## Features

- User authentication (JWT)
- Resume upload and analysis
- Job application tracking
- Skills management
- Dashboard with analytics
- Protected routes
- Form validation
- Responsive design

## Development Notes

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:5000`
- Never commit `.env` files
- All API calls centralized in `frontend/src/services/api.js`
- Components use Tailwind CSS (no custom CSS files)

## Available Routes

- `/login` - User login
- `/register` - New user registration
- `/dashboard` - Main dashboard (protected)




# Backend

Flask-based REST API for the Smart Career Assistant web application.

## Features

- **Authentication**: JWT-based user authentication with bcrypt password hashing
- **Resume Management**: Upload, analyze, and track resumes with AI-powered insights
- **Job Applications**: Full CRUD operations for job application tracking
- **Skills Management**: Track and analyze technical and soft skills
- **Dashboard Analytics**: Real-time statistics and trend data
- **Profile Management**: Complete user profile with activity tracking

## Tech Stack

- **Framework**: Flask 3.0
- **Database**: MongoDB (with Flask-PyMongo)
- **Authentication**: JWT (Flask-JWT-Extended)
- **Password Hashing**: bcrypt
- **PDF Processing**: PyPDF2
- **Validation**: email-validator

## Setup Instructions

### 1. Prerequisites

- Python 3.8+
- MongoDB (local or MongoDB Atlas)
- pip (Python package manager)

### 2. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/smart_career
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart_career

# JWT Secret (change this!)
JWT_SECRET_KEY=your-secure-secret-key-change-this-in-production

# Server Port
PORT=5000
```

### 4. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install and start MongoDB
mongod --dbpath /path/to/data/directory
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Add database user
4. Whitelist your IP address
5. Get connection string and update `MONGODB_URI` in `.env`

### 5. Run the Server

```bash
python app.py
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Resume
- `POST /api/resume/upload` - Upload and analyze resume
- `GET /api/resume/list` - List all resumes
- `GET /api/resume/<id>` - Get specific resume

### Job Applications
- `GET /api/jobs/list` - List all job applications
- `POST /api/jobs/create` - Create new application
- `GET /api/jobs/<id>` - Get specific application
- `PUT /api/jobs/<id>` - Update application
- `DELETE /api/jobs/<id>` - Delete application

### Skills
- `GET /api/skills/list` - List all skills
- `POST /api/skills/create` - Add new skill
- `GET /api/skills/<id>` - Get specific skill
- `PUT /api/skills/<id>` - Update skill
- `DELETE /api/skills/<id>` - Delete skill
- `GET /api/skills/stats` - Get skill statistics

### Profile
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/` - Update profile
- `GET /api/profile/activity` - Get activity log
- `GET /api/profile/stats` - Get profile statistics

## Project Structure

```
backend/
├── app.py                 # Main application file
├── config.py              # Configuration management
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables
├── models/                # Data models
│   ├── user.py
│   ├── job_application.py
│   ├── skill.py
│   └── resume.py
├── routes/                # API route handlers
│   ├── auth_routes.py
│   ├── dashboard_routes.py
│   ├── resume_routes.py
│   ├── job_routes.py
│   ├── skill_routes.py
│   └── profile_routes.py
├── middleware/            # Authentication middleware
│   └── auth_middleware.py
├── utils/                 # Utility functions
│   ├── validators.py
│   └── resume_analyzer.py
└── uploads/              # File upload directory
    └── resumes/
```

## Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Security Features

- JWT token-based authentication
- bcrypt password hashing
- CORS protection
- File upload validation
- Email validation
- SQL injection protection (using MongoDB)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `FLASK_ENV` | Environment (development/production) | production |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/smart_career |
| `JWT_SECRET_KEY` | JWT signing key | Required |
| `JWT_ACCESS_TOKEN_EXPIRES` | Token expiry in seconds | 86400 (24h) |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `MAX_FILE_SIZE` | Max upload file size in bytes | 5242880 (5MB) |
| `UPLOAD_FOLDER` | Upload directory path | uploads/resumes |
| `ALLOWED_EXTENSIONS` | Allowed file extensions | pdf,doc,docx |

## Production Deployment

1. Set `FLASK_ENV=production` in `.env`
2. Use a strong, random `JWT_SECRET_KEY`
3. Configure MongoDB Atlas for cloud database
4. Set up proper CORS origins
5. Use a production WSGI server (gunicorn):

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string format
- Verify firewall/network settings
- For Atlas, ensure IP is whitelisted

### JWT Token Errors
- Ensure `JWT_SECRET_KEY` is set
- Check token expiry settings
- Verify token is being sent in headers

### File Upload Issues
- Check `UPLOAD_FOLDER` exists and is writable
- Verify file size limits
- Ensure file extension is allowed

## License

MIT License
