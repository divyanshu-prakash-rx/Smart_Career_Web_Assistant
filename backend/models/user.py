from datetime import datetime
from bson import ObjectId
import bcrypt

class User:
    """User model for authentication and profile management."""
    
    def __init__(self, name, email, password=None, hashed_password=None):
        self.name = name
        self.email = email.lower()
        self.password_hash = hashed_password if hashed_password else self._hash_password(password)
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
    
    def _hash_password(self, password):
        """Hash password using bcrypt."""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        """Verify password against hash."""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def to_dict(self):
        """Convert user object to dictionary."""
        return {
            'name': self.name,
            'email': self.email,
            'password_hash': self.password_hash,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def to_json(self):
        """Convert user object to JSON-safe dictionary (excluding sensitive data)."""
        return {
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }

    @staticmethod
    def from_dict(data):
        """Create User object from dictionary."""
        return User(
            name=data['name'],
            email=data['email'],
            hashed_password=data.get('password_hash')
        )
