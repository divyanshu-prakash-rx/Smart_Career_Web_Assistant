from datetime import datetime
from bson import ObjectId

class Skill:
    """Skill model for tracking user skills."""
    
    def __init__(self, user_id, name, level, category='Technical', **kwargs):
        self.user_id = ObjectId(user_id) if isinstance(user_id, str) else user_id
        self.name = name
        self.level = level  # 0-100
        self.category = category  # Technical, Soft, Language, etc.
        self.demand = kwargs.get('demand', 'Medium')  # Low, Medium, High, Very High
        self.trend = kwargs.get('trend', '+0%')
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
    
    def to_dict(self):
        """Convert skill to dictionary."""
        return {
            'user_id': self.user_id,
            'name': self.name,
            'level': self.level,
            'category': self.category,
            'demand': self.demand,
            'trend': self.trend,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def to_json(self):
        """Convert skill to JSON-safe dictionary."""
        return {
            'id': str(self.user_id),
            'name': self.name,
            'level': self.level,
            'category': self.category,
            'demand': self.demand,
            'trend': self.trend,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    @staticmethod
    def from_dict(data):
        """Create Skill object from dictionary."""
        return Skill(
            user_id=data['user_id'],
            name=data['name'],
            level=data['level'],
            category=data.get('category', 'Technical'),
            demand=data.get('demand', 'Medium'),
            trend=data.get('trend', '+0%')
        )
