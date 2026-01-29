from datetime import datetime
from bson import ObjectId

class Resume:
    """Resume model for storing resume information and analysis."""
    
    def __init__(self, user_id, filename, file_path, **kwargs):
        self.user_id = ObjectId(user_id) if isinstance(user_id, str) else user_id
        self.filename = filename
        self.file_path = file_path
        self.file_size = kwargs.get('file_size', 0)
        self.analysis = kwargs.get('analysis', None)
        self.score = kwargs.get('score', 0)
        self.ats_score = kwargs.get('ats_score', 0)
        self.uploaded_at = datetime.utcnow()
    
    def to_dict(self):
        """Convert resume to dictionary."""
        return {
            'user_id': self.user_id,
            'filename': self.filename,
            'file_path': self.file_path,
            'file_size': self.file_size,
            'analysis': self.analysis,
            'score': self.score,
            'ats_score': self.ats_score,
            'uploaded_at': self.uploaded_at
        }
    
    def to_json(self):
        """Convert resume to JSON-safe dictionary."""
        return {
            'id': str(self.user_id),
            'filename': self.filename,
            'file_size': self.file_size,
            'analysis': self.analysis,
            'score': self.score,
            'ats_score': self.ats_score,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
        }

    @staticmethod
    def from_dict(data):
        """Create Resume object from dictionary."""
        return Resume(
            user_id=data['user_id'],
            filename=data['filename'],
            file_path=data['file_path'],
            file_size=data.get('file_size', 0),
            analysis=data.get('analysis'),
            score=data.get('score', 0),
            ats_score=data.get('ats_score', 0)
        )
