from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from middleware.auth_middleware import token_required, get_current_user_id
from app import mongo
from models.resume import Resume
from utils.validators import allowed_file
from utils.resume_analyzer import ResumeAnalyzer
from config import Config
import os

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/upload', methods=['POST'])
@token_required
def upload_resume():
    """Upload and analyze resume."""
    try:
        user_id = get_current_user_id()
        
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Validate file type
        if not allowed_file(file.filename, Config.ALLOWED_EXTENSIONS):
            return jsonify({'error': f'Invalid file type. Allowed types: {", ".join(Config.ALLOWED_EXTENSIONS)}'}), 400
        
        # Secure filename and save
        filename = secure_filename(file.filename)
        timestamp = int(os.times().elapsed * 1000)
        unique_filename = f"{user_id}_{timestamp}_{filename}"
        file_path = os.path.join(Config.UPLOAD_FOLDER, unique_filename)
        
        os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
        file.save(file_path)
        
        # Get file size
        file_size = os.path.getsize(file_path)
        
        # Analyze resume
        analysis_result = ResumeAnalyzer.analyze_resume(file_path)
        
        # Save resume record
        resume = Resume(
            user_id=user_id,
            filename=filename,
            file_path=file_path,
            file_size=file_size,
            analysis=analysis_result,
            score=analysis_result.get('score', 0),
            ats_score=analysis_result.get('atsScore', 0)
        )
        
        result = mongo.db.resumes.insert_one(resume.to_dict())
        
        # Update user's skills based on detected skills
        detected_skills = analysis_result.get('skills', {}).get('detected', [])
        for skill_name in detected_skills:
            # Check if skill already exists
            existing_skill = mongo.db.skills.find_one({
                'user_id': user_id,
                'name': skill_name
            })
            
            if not existing_skill:
                # Add new skill
                mongo.db.skills.insert_one({
                    'user_id': user_id,
                    'name': skill_name,
                    'level': 80,  # Default level for detected skills
                    'category': 'Technical',
                    'demand': 'High',
                    'trend': '+5%'
                })
        
        return jsonify({
            'message': 'Resume uploaded and analyzed successfully',
            'resume': {
                'id': str(result.inserted_id),
                'filename': filename,
                'file_size': file_size,
                'analysis': analysis_result
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Failed to upload resume', 'message': str(e)}), 500

@resume_bp.route('/list', methods=['GET'])
@token_required
def list_resumes():
    """Get all resumes for current user."""
    try:
        user_id = get_current_user_id()
        
        resumes = list(mongo.db.resumes.find(
            {'user_id': user_id}
        ).sort('uploaded_at', -1))
        
        resume_list = []
        for resume in resumes:
            resume_list.append({
                'id': str(resume['_id']),
                'filename': resume['filename'],
                'file_size': resume.get('file_size', 0),
                'score': resume.get('score', 0),
                'ats_score': resume.get('ats_score', 0),
                'uploaded_at': resume['uploaded_at'].isoformat() if resume.get('uploaded_at') else None
            })
        
        return jsonify({'resumes': resume_list}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch resumes', 'message': str(e)}), 500

@resume_bp.route('/<resume_id>', methods=['GET'])
@token_required
def get_resume(resume_id):
    """Get specific resume with analysis."""
    try:
        from bson import ObjectId
        user_id = get_current_user_id()
        
        resume = mongo.db.resumes.find_one({
            '_id': ObjectId(resume_id),
            'user_id': user_id
        })
        
        if not resume:
            return jsonify({'error': 'Resume not found'}), 404
        
        return jsonify({
            'resume': {
                'id': str(resume['_id']),
                'filename': resume['filename'],
                'file_size': resume.get('file_size', 0),
                'score': resume.get('score', 0),
                'ats_score': resume.get('ats_score', 0),
                'analysis': resume.get('analysis', {}),
                'uploaded_at': resume['uploaded_at'].isoformat() if resume.get('uploaded_at') else None
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch resume', 'message': str(e)}), 500
