from flask import Blueprint, request, jsonify
from middleware.auth_middleware import token_required, get_current_user_id
from app import mongo
from utils.validators import validate_email_address
from datetime import datetime
from bson import ObjectId

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/', methods=['GET'])
@token_required
def get_profile():
    """Get user profile."""
    try:
        user_id = get_current_user_id()
        
        user = mongo.db.users.find_one({'_id': user_id})
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get additional profile data if exists
        profile_data = mongo.db.profiles.find_one({'user_id': user_id})
        
        profile = {
            'id': str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'phone': profile_data.get('phone', '') if profile_data else '',
            'location': profile_data.get('location', '') if profile_data else '',
            'title': profile_data.get('title', '') if profile_data else '',
            'bio': profile_data.get('bio', '') if profile_data else '',
            'linkedin': profile_data.get('linkedin', '') if profile_data else '',
            'github': profile_data.get('github', '') if profile_data else '',
            'website': profile_data.get('website', '') if profile_data else '',
            'experience': profile_data.get('experience', '') if profile_data else '',
            'availability': profile_data.get('availability', '') if profile_data else '',
            'expected_salary': profile_data.get('expected_salary', '') if profile_data else '',
            'created_at': user['created_at'].isoformat() if user.get('created_at') else None
        }
        
        return jsonify({'profile': profile}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch profile', 'message': str(e)}), 500

@profile_bp.route('/', methods=['PUT'])
@token_required
def update_profile():
    """Update user profile."""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        # Update basic user info if provided
        user_updates = {}
        if 'name' in data:
            user_updates['name'] = data['name']
        
        if 'email' in data:
            # Validate email
            is_valid, error = validate_email_address(data['email'])
            if not is_valid:
                return jsonify({'error': f'Invalid email: {error}'}), 400
            
            # Check if email is already taken by another user
            existing = mongo.db.users.find_one({
                'email': data['email'].lower(),
                '_id': {'$ne': user_id}
            })
            if existing:
                return jsonify({'error': 'Email already in use'}), 409
            
            user_updates['email'] = data['email'].lower()
        
        if user_updates:
            user_updates['updated_at'] = datetime.utcnow()
            mongo.db.users.update_one(
                {'_id': user_id},
                {'$set': user_updates}
            )
        
        # Update extended profile data
        profile_updates = {
            'user_id': user_id,
            'updated_at': datetime.utcnow()
        }
        
        allowed_fields = [
            'phone', 'location', 'title', 'bio', 'linkedin', 
            'github', 'website', 'experience', 'availability', 'expected_salary'
        ]
        
        for field in allowed_fields:
            if field in data:
                profile_updates[field] = data[field]
        
        # Upsert profile data
        mongo.db.profiles.update_one(
            {'user_id': user_id},
            {'$set': profile_updates},
            upsert=True
        )
        
        return jsonify({'message': 'Profile updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to update profile', 'message': str(e)}), 500

@profile_bp.route('/activity', methods=['GET'])
@token_required
def get_activity():
    """Get user activity log."""
    try:
        user_id = get_current_user_id()
        
        activities = []
        
        # Recent job applications
        recent_jobs = list(mongo.db.job_applications.find(
            {'user_id': user_id}
        ).sort('created_at', -1).limit(3))
        
        for job in recent_jobs:
            activities.append({
                'action': f"Applied to {job['company']} - {job['position']}",
                'time': job['created_at'].isoformat() if job.get('created_at') else None,
                'type': 'job_application'
            })
        
        # Recent resume uploads
        recent_resumes = list(mongo.db.resumes.find(
            {'user_id': user_id}
        ).sort('uploaded_at', -1).limit(2))
        
        for resume in recent_resumes:
            activities.append({
                'action': f"Uploaded resume: {resume['filename']}",
                'time': resume['uploaded_at'].isoformat() if resume.get('uploaded_at') else None,
                'type': 'resume_upload'
            })
        
        # Recent skills added
        recent_skills = list(mongo.db.skills.find(
            {'user_id': user_id}
        ).sort('created_at', -1).limit(2))
        
        for skill in recent_skills:
            activities.append({
                'action': f"Added skill: {skill['name']}",
                'time': skill['created_at'].isoformat() if skill.get('created_at') else None,
                'type': 'skill_added'
            })
        
        # Sort by time
        activities.sort(key=lambda x: x['time'] if x['time'] else '', reverse=True)
        
        return jsonify({'activities': activities[:10]}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch activity', 'message': str(e)}), 500

@profile_bp.route('/stats', methods=['GET'])
@token_required
def get_profile_stats():
    """Get profile statistics."""
    try:
        user_id = get_current_user_id()
        
        # Profile completeness
        user = mongo.db.users.find_one({'_id': user_id})
        profile = mongo.db.profiles.find_one({'user_id': user_id})
        
        required_fields = ['name', 'email', 'phone', 'location', 'title', 'bio']
        completed_fields = 2  # name and email are always filled
        
        if profile:
            for field in required_fields[2:]:
                if profile.get(field):
                    completed_fields += 1
        
        completeness = int((completed_fields / len(required_fields)) * 100)
        
        # Activity stats
        total_applications = mongo.db.job_applications.count_documents({'user_id': user_id})
        total_resumes = mongo.db.resumes.count_documents({'user_id': user_id})
        total_skills = mongo.db.skills.count_documents({'user_id': user_id})
        
        # Calculate response rate (mock calculation)
        if total_applications > 0:
            interviews = mongo.db.job_applications.count_documents({
                'user_id': user_id,
                'status': {'$in': ['interview', 'offer']}
            })
            response_rate = int((interviews / total_applications) * 100)
        else:
            response_rate = 0
        
        return jsonify({
            'profileCompleteness': completeness,
            'totalApplications': total_applications,
            'totalResumes': total_resumes,
            'totalSkills': total_skills,
            'responseRate': response_rate
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch profile stats', 'message': str(e)}), 500
