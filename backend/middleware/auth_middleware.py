from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from bson import ObjectId

def token_required(fn):
    """Decorator to protect routes that require authentication."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            return fn(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Invalid or expired token', 'message': str(e)}), 401
    return wrapper

def get_current_user_id():
    """Get the current user's ID from JWT token."""
    try:
        user_id = get_jwt_identity()
        return ObjectId(user_id)
    except Exception:
        return None
