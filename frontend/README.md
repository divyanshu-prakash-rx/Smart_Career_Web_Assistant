# Smart Career Assistant

A full-stack web application to help users manage resumes, track job applications, analyze skills, and monitor career progress.

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

---

Built with clean code principles and solid SDE fundamentals.
