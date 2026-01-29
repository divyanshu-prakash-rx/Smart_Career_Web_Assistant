from datetime import datetime
from bson import ObjectId

class JobApplication:
    """Job Application model for tracking job applications."""
    
    def __init__(self, user_id, company, position, status='applied', **kwargs):
        self.user_id = ObjectId(user_id) if isinstance(user_id, str) else user_id
        self.company = company
        self.position = position
        self.status = status  # applied, in-review, interview, offer, rejected
        self.applied_date = kwargs.get('applied_date', datetime.utcnow())
        self.salary = kwargs.get('salary', '')
        self.location = kwargs.get('location', '')
        self.job_type = kwargs.get('job_type', 'Full-time')  # Full-time, Part-time, Contract, Remote, Hybrid
        self.description = kwargs.get('description', '')
        self.notes = kwargs.get('notes', '')
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
    
    def to_dict(self):
        """Convert job application to dictionary."""
        return {
            'user_id': self.user_id,
            'company': self.company,
            'position': self.position,
            'status': self.status,
            'applied_date': self.applied_date,
            'salary': self.salary,
            'location': self.location,
            'job_type': self.job_type,
            'description': self.description,
            'notes': self.notes,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def to_json(self):
        """Convert job application to JSON-safe dictionary."""
        return {
            'id': str(self.user_id),
            'company': self.company,
            'position': self.position,
            'status': self.status,
            'applied_date': self.applied_date.isoformat() if self.applied_date else None,
            'salary': self.salary,
            'location': self.location,
            'job_type': self.job_type,
            'description': self.description,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    @staticmethod
    def from_dict(data):
        """Create JobApplication object from dictionary."""
        return JobApplication(
            user_id=data['user_id'],
            company=data['company'],
            position=data['position'],
            status=data.get('status', 'applied'),
            applied_date=data.get('applied_date'),
            salary=data.get('salary', ''),
            location=data.get('location', ''),
            job_type=data.get('job_type', 'Full-time'),
            description=data.get('description', ''),
            notes=data.get('notes', '')
        )
