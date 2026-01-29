from flask import Blueprint, request, jsonify
from middleware.auth_middleware import token_required, get_current_user_id
from app import mongo
from models.job_application import JobApplication
from utils.validators import validate_required_fields
from bson import ObjectId
from datetime import datetime

job_bp = Blueprint('job', __name__)

@job_bp.route('/list', methods=['GET'])
@token_required
def list_jobs():
    """Get all job applications for current user."""
    try:
        user_id = get_current_user_id()
        
        # Get filter from query params
        status_filter = request.args.get('status', None)
        
        query = {'user_id': user_id}
        if status_filter and status_filter != 'all':
            query['status'] = status_filter
        
        jobs = list(mongo.db.job_applications.find(query).sort('applied_date', -1))
        
        job_list = []
        for job in jobs:
            job_list.append({
                'id': str(job['_id']),
                'company': job['company'],
                'position': job['position'],
                'status': job['status'],
                'applied_date': job['applied_date'].isoformat() if job.get('applied_date') else None,
                'salary': job.get('salary', ''),
                'location': job.get('location', ''),
                'job_type': job.get('job_type', 'Full-time'),
                'description': job.get('description', ''),
                'notes': job.get('notes', '')
            })
        
        return jsonify({'jobs': job_list}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch jobs', 'message': str(e)}), 500

@job_bp.route('/create', methods=['POST'])
@token_required
def create_job():
    """Create new job application."""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        # Validate required fields
        is_valid, error = validate_required_fields(data, ['company', 'position'])
        if not is_valid:
            return jsonify({'error': error}), 400
        
        # Create job application
        job = JobApplication(
            user_id=user_id,
            company=data['company'],
            position=data['position'],
            status=data.get('status', 'applied'),
            applied_date=datetime.fromisoformat(data['applied_date']) if data.get('applied_date') else datetime.utcnow(),
            salary=data.get('salary', ''),
            location=data.get('location', ''),
            job_type=data.get('job_type', 'Full-time'),
            description=data.get('description', ''),
            notes=data.get('notes', '')
        )
        
        result = mongo.db.job_applications.insert_one(job.to_dict())
        
        return jsonify({
            'message': 'Job application created successfully',
            'job': {
                'id': str(result.inserted_id),
                'company': job.company,
                'position': job.position,
                'status': job.status
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Failed to create job application', 'message': str(e)}), 500

@job_bp.route('/<job_id>', methods=['GET'])
@token_required
def get_job(job_id):
    """Get specific job application."""
    try:
        user_id = get_current_user_id()
        
        job = mongo.db.job_applications.find_one({
            '_id': ObjectId(job_id),
            'user_id': user_id
        })
        
        if not job:
            return jsonify({'error': 'Job application not found'}), 404
        
        return jsonify({
            'job': {
                'id': str(job['_id']),
                'company': job['company'],
                'position': job['position'],
                'status': job['status'],
                'applied_date': job['applied_date'].isoformat() if job.get('applied_date') else None,
                'salary': job.get('salary', ''),
                'location': job.get('location', ''),
                'job_type': job.get('job_type', 'Full-time'),
                'description': job.get('description', ''),
                'notes': job.get('notes', '')
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch job', 'message': str(e)}), 500

@job_bp.route('/<job_id>', methods=['PUT'])
@token_required
def update_job(job_id):
    """Update job application."""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        # Build update document
        update_data = {'updated_at': datetime.utcnow()}
        
        allowed_fields = ['company', 'position', 'status', 'salary', 'location', 'job_type', 'description', 'notes']
        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]
        
        if 'applied_date' in data:
            update_data['applied_date'] = datetime.fromisoformat(data['applied_date'])
        
        result = mongo.db.job_applications.update_one(
            {'_id': ObjectId(job_id), 'user_id': user_id},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Job application not found'}), 404
        
        return jsonify({'message': 'Job application updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to update job', 'message': str(e)}), 500

@job_bp.route('/<job_id>', methods=['DELETE'])
@token_required
def delete_job(job_id):
    """Delete job application."""
    try:
        user_id = get_current_user_id()
        
        result = mongo.db.job_applications.delete_one({
            '_id': ObjectId(job_id),
            'user_id': user_id
        })
        
        if result.deleted_count == 0:
            return jsonify({'error': 'Job application not found'}), 404
        
        return jsonify({'message': 'Job application deleted successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to delete job', 'message': str(e)}), 500
