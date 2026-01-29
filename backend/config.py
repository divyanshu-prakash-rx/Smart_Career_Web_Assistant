import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Application configuration class."""
    
    # Server Configuration
    PORT = int(os.getenv('PORT', 5000))
    DEBUG = os.getenv('FLASK_ENV', 'production') == 'development'
    
    # MongoDB Configuration
    MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/smart_career')
    
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 86400)))
    
    # CORS Configuration
    FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5173')
    
    # File Upload Configuration
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_FILE_SIZE', 5242880))  # 5MB default
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads/resumes')
    ALLOWED_EXTENSIONS = set(os.getenv('ALLOWED_EXTENSIONS', 'pdf,doc,docx').split(','))
    
    @staticmethod
    def init_app(app):
        """Initialize application with configuration."""
        # Create upload folder if it doesn't exist
        os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
