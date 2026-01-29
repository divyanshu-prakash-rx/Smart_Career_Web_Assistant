from flask import Blueprint, request, jsonify
from middleware.auth_middleware import token_required, get_current_user_id
from app import mongo
from models.skill import Skill
from utils.validators import validate_required_fields
from bson import ObjectId
from datetime import datetime

skill_bp = Blueprint('skill', __name__)

@skill_bp.route('/list', methods=['GET'])
@token_required
def list_skills():
    """Get all skills for current user."""
    try:
        user_id = get_current_user_id()
        
        # Get category filter from query params
        category_filter = request.args.get('category', None)
        
        query = {'user_id': user_id}
        if category_filter:
            query['category'] = category_filter
        
        skills = list(mongo.db.skills.find(query).sort('level', -1))
        
        skill_list = []
        for skill in skills:
            skill_list.append({
                'id': str(skill['_id']),
                'name': skill['name'],
                'level': skill['level'],
                'category': skill.get('category', 'Technical'),
                'demand': skill.get('demand', 'Medium'),
                'trend': skill.get('trend', '+0%')
            })
        
        return jsonify({'skills': skill_list}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch skills', 'message': str(e)}), 500

@skill_bp.route('/create', methods=['POST'])
@token_required
def create_skill():
    """Create new skill."""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        # Validate required fields
        is_valid, error = validate_required_fields(data, ['name', 'level'])
        if not is_valid:
            return jsonify({'error': error}), 400
        
        # Validate level range
        if not (0 <= data['level'] <= 100):
            return jsonify({'error': 'Skill level must be between 0 and 100'}), 400
        
        # Check if skill already exists for user
        existing_skill = mongo.db.skills.find_one({
            'user_id': user_id,
            'name': data['name']
        })
        
        if existing_skill:
            return jsonify({'error': 'Skill already exists'}), 409
        
        # Create skill
        skill = Skill(
            user_id=user_id,
            name=data['name'],
            level=data['level'],
            category=data.get('category', 'Technical'),
            demand=data.get('demand', 'Medium'),
            trend=data.get('trend', '+0%')
        )
        
        result = mongo.db.skills.insert_one(skill.to_dict())
        
        return jsonify({
            'message': 'Skill created successfully',
            'skill': {
                'id': str(result.inserted_id),
                'name': skill.name,
                'level': skill.level,
                'category': skill.category
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Failed to create skill', 'message': str(e)}), 500

@skill_bp.route('/<skill_id>', methods=['GET'])
@token_required
def get_skill(skill_id):
    """Get specific skill."""
    try:
        user_id = get_current_user_id()
        
        skill = mongo.db.skills.find_one({
            '_id': ObjectId(skill_id),
            'user_id': user_id
        })
        
        if not skill:
            return jsonify({'error': 'Skill not found'}), 404
        
        return jsonify({
            'skill': {
                'id': str(skill['_id']),
                'name': skill['name'],
                'level': skill['level'],
                'category': skill.get('category', 'Technical'),
                'demand': skill.get('demand', 'Medium'),
                'trend': skill.get('trend', '+0%')
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch skill', 'message': str(e)}), 500

@skill_bp.route('/<skill_id>', methods=['PUT'])
@token_required
def update_skill(skill_id):
    """Update skill."""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        # Validate level if provided
        if 'level' in data and not (0 <= data['level'] <= 100):
            return jsonify({'error': 'Skill level must be between 0 and 100'}), 400
        
        # Build update document
        update_data = {'updated_at': datetime.utcnow()}
        
        allowed_fields = ['name', 'level', 'category', 'demand', 'trend']
        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]
        
        result = mongo.db.skills.update_one(
            {'_id': ObjectId(skill_id), 'user_id': user_id},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Skill not found'}), 404
        
        return jsonify({'message': 'Skill updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to update skill', 'message': str(e)}), 500

@skill_bp.route('/<skill_id>', methods=['DELETE'])
@token_required
def delete_skill(skill_id):
    """Delete skill."""
    try:
        user_id = get_current_user_id()
        
        result = mongo.db.skills.delete_one({
            '_id': ObjectId(skill_id),
            'user_id': user_id
        })
        
        if result.deleted_count == 0:
            return jsonify({'error': 'Skill not found'}), 404
        
        return jsonify({'message': 'Skill deleted successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to delete skill', 'message': str(e)}), 500

@skill_bp.route('/stats', methods=['GET'])
@token_required
def get_skill_stats():
    """Get skill statistics and analysis."""
    try:
        user_id = get_current_user_id()
        
        # Get all skills
        skills = list(mongo.db.skills.find({'user_id': user_id}))
        
        if not skills:
            return jsonify({
                'totalSkills': 0,
                'averageProficiency': 0,
                'topSkills': [],
                'categoryBreakdown': []
            }), 200
        
        # Calculate average proficiency
        total_level = sum(skill['level'] for skill in skills)
        avg_proficiency = total_level / len(skills) if skills else 0
        
        # Get top skills
        top_skills = sorted(skills, key=lambda x: x['level'], reverse=True)[:5]
        
        # Category breakdown
        category_count = {}
        for skill in skills:
            category = skill.get('category', 'Technical')
            category_count[category] = category_count.get(category, 0) + 1
        
        return jsonify({
            'totalSkills': len(skills),
            'averageProficiency': round(avg_proficiency, 2),
            'topSkills': [
                {
                    'name': skill['name'],
                    'level': skill['level'],
                    'category': skill.get('category', 'Technical')
                }
                for skill in top_skills
            ],
            'categoryBreakdown': [
                {'category': k, 'count': v}
                for k, v in category_count.items()
            ]
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch skill stats', 'message': str(e)}), 500
