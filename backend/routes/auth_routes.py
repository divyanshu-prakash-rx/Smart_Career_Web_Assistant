from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app import mongo
from models.user import User
from utils.validators import validate_email_address, validate_password, validate_required_fields

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    try:
        data = request.get_json()
        
        # Validate required fields
        is_valid, error = validate_required_fields(data, ['name', 'email', 'password'])
        if not is_valid:
            return jsonify({'error': error}), 400
        
        # Validate email
        is_valid, error = validate_email_address(data['email'])
        if not is_valid:
            return jsonify({'error': f'Invalid email: {error}'}), 400
        
        # Validate password
        is_valid, error = validate_password(data['password'])
        if not is_valid:
            return jsonify({'error': error}), 400
        
        # Check if user already exists
        existing_user = mongo.db.users.find_one({'email': data['email'].lower()})
        if existing_user:
            return jsonify({'error': 'User with this email already exists'}), 409
        
        # Create new user
        user = User(name=data['name'], email=data['email'], password=data['password'])
        result = mongo.db.users.insert_one(user.to_dict())
        
        return jsonify({
            'message': 'User registered successfully',
            'user': {
                'id': str(result.inserted_id),
                'name': user.name,
                'email': user.email
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Registration failed', 'message': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user and return JWT token."""
    try:
        data = request.get_json()
        
        # Validate required fields
        is_valid, error = validate_required_fields(data, ['email', 'password'])
        if not is_valid:
            return jsonify({'error': error}), 400
        
        # Find user
        user_data = mongo.db.users.find_one({'email': data['email'].lower()})
        if not user_data:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Verify password
        user = User.from_dict(user_data)
        if not user.check_password(data['password']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Create JWT token
        access_token = create_access_token(identity=str(user_data['_id']))
        
        return jsonify({
            'message': 'Login successful',
            'token': access_token,
            'user': {
                'id': str(user_data['_id']),
                'name': user.name,
                'email': user.email
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Login failed', 'message': str(e)}), 500

@auth_bp.route('/verify', methods=['GET'])
def verify_token():
    """Verify JWT token validity."""
    from middleware.auth_middleware import token_required
    
    @token_required
    def verify():
        from middleware.auth_middleware import get_current_user_id
        user_id = get_current_user_id()
        
        user_data = mongo.db.users.find_one({'_id': user_id})
        if not user_data:
            return jsonify({'error': 'User not found'}), 404
        
        user = User.from_dict(user_data)
        return jsonify({
            'valid': True,
            'user': {
                'id': str(user_data['_id']),
                'name': user.name,
                'email': user.email
            }
        }), 200
    
    return verify()
