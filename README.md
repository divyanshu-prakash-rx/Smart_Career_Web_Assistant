# Smart Career Web Assistant

A full-stack web application for resume management, job application tracking, skills analysis, and career progress monitoring.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18-61dafb.svg)](https://reactjs.org/)

## Features

- JWT-based authentication with bcrypt password hashing
- AI-powered resume analysis and tracking
- Job application management with CRUD operations
- Skills tracking and gap analysis
- Real-time analytics dashboard
- User profile and activity monitoring
- Responsive design for all devices

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Axios

**Backend**
- Flask 3.0
- MongoDB with Flask-PyMongo
- JWT (Flask-JWT-Extended)
- PyPDF2 for PDF processing

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- MongoDB (local or MongoDB Atlas account)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/smart-career-assistant.git
cd smart-career-assistant
```

**2. Backend Setup**
```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/smart_career
JWT_SECRET_KEY=your-secure-secret-key
PORT=5000
```

Start backend:
```bash
python app.py
# Server runs on http://localhost:5000
```

**3. Frontend Setup**
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
# App runs on http://localhost:5173
```

## Project Structure
```
Smart_Career_Web_Assistant/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── app.py
│   └── requirements.txt
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Resume Management
- `POST /api/resume/upload` - Upload and analyze resume
- `GET /api/resume/list` - List all resumes
- `GET /api/resume/:id` - Get specific resume

### Job Applications
- `GET /api/jobs/list` - List all applications
- `POST /api/jobs/create` - Create new application
- `GET /api/jobs/:id` - Get specific application
- `PUT /api/jobs/:id` - Update application
- `DELETE /api/jobs/:id` - Delete application

### Skills
- `GET /api/skills/list` - List all skills
- `POST /api/skills/create` - Add new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `GET /api/skills/stats` - Get skill statistics

### Profile
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/` - Update profile
- `GET /api/profile/activity` - Get activity log
- `GET /api/profile/stats` - Get profile statistics

## Environment Variables

### Backend

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET_KEY` | JWT signing key | Yes | - |
| `PORT` | Server port | No | 5000 |
| `FLASK_ENV` | Environment mode | No | production |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:5173 |
| `MAX_FILE_SIZE` | Max upload size (bytes) | No | 5242880 |

### Frontend

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API URL | Yes |

## Production Deployment

### Backend
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend
```bash
npm run build
# Deploy dist/ folder
```

**Recommended Platforms:**
- Backend: Heroku, Railway, Render
- Frontend: Vercel, Netlify, Cloudflare Pages
- Database: MongoDB Atlas

## Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Security Features

- JWT token-based authentication
- bcrypt password hashing
- CORS protection
- File upload validation
- Email validation
- NoSQL injection protection

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB is running
- Check connection string format
- For Atlas: ensure IP is whitelisted

### JWT Token Errors
- Verify `JWT_SECRET_KEY` is set
- Check token expiry settings
- Ensure token is in Authorization header

### File Upload Issues
- Check `UPLOAD_FOLDER` exists and is writable
- Verify file size limits
- Ensure allowed file extensions

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Your Name - [GitHub](https://github.com/divyanshu-prakash-rx)

## Acknowledgments

- Flask community
- React team
- MongoDB