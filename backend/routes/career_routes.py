"""
Career Analysis Routes - Classical NLP Features
Job matching, skill gap analysis, and career recommendations
"""

from flask import Blueprint, request, jsonify
from middleware.auth_middleware import token_required, get_current_user_id
from utils.job_matcher import JobMatcher
from utils.skill_gap_analyzer import SkillGapAnalyzer
from bson import ObjectId

career_bp = Blueprint('career', __name__)

@career_bp.route('/match-job', methods=['POST'])
@token_required
def match_job():
    """Match resume with job description using TF-IDF."""
    try:
        from app import mongo
        data = request.json
        
        resume_id = data.get('resume_id')
        job_description = data.get('job_description', '')
        
        if not resume_id or not job_description:
            return jsonify({'error': 'Resume ID and job description required'}), 400
        
        # Get resume text
        user_id = get_current_user_id()
        resume = mongo.db.resumes.find_one({
            '_id': ObjectId(resume_id),
            'user_id': user_id
        })
        
        if not resume:
            return jsonify({'error': 'Resume not found'}), 404
        
        # Get resume text from file
        from utils.resume_analyzer import ResumeAnalyzer
        resume_text = ResumeAnalyzer.extract_text_from_pdf(resume['file_path'])
        
        if not resume_text:
            return jsonify({'error': 'Could not extract resume text'}), 400
        
        # Calculate match
        result = JobMatcher.calculate_match_score(resume_text, job_description)
        
        return jsonify({
            'match_score': result['score'],
            'matching_keywords': result['matching_keywords'],
            'missing_keywords': result['missing_keywords'],
            'recommendation': 'Strong match' if result['score'] >= 70 else 
                            'Good match' if result['score'] >= 50 else 
                            'Needs improvement'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@career_bp.route('/recommend-jobs', methods=['POST'])
@token_required
def recommend_jobs():
    """Recommend jobs based on resume."""
    try:
        from app import mongo
        data = request.json
        
        resume_id = data.get('resume_id')
        
        if not resume_id:
            return jsonify({'error': 'Resume ID required'}), 400
        
        # Get resume text
        user_id = get_current_user_id()
        resume = mongo.db.resumes.find_one({
            '_id': ObjectId(resume_id),
            'user_id': user_id
        })
        
        if not resume:
            return jsonify({'error': 'Resume not found'}), 404
        
        from utils.resume_analyzer import ResumeAnalyzer
        resume_text = ResumeAnalyzer.extract_text_from_pdf(resume['file_path'])
        
        if not resume_text:
            return jsonify({'error': 'Could not extract resume text'}), 400
        
        # Get user's job applications to recommend similar ones
        jobs = list(mongo.db.job_applications.find({'user_id': user_id}).limit(20))
        
        job_listings = [{
            'id': str(job['_id']),
            'title': job.get('position', ''),
            'company': job.get('company', ''),
            'description': job.get('description', job.get('position', ''))
        } for job in jobs]
        
        if not job_listings:
            return jsonify({
                'message': 'No jobs to analyze yet',
                'recommendations': []
            }), 200
        
        recommendations = JobMatcher.recommend_jobs(resume_text, job_listings)
        
        return jsonify({
            'recommendations': recommendations[:10]  # Top 10
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@career_bp.route('/skill-gap', methods=['POST'])
@token_required
def analyze_skill_gap():
    """Analyze skill gap for target role."""
    try:
        from app import mongo
        data = request.json
        
        target_role = data.get('target_role', '').lower().replace(' ', '_')
        
        if not target_role:
            return jsonify({'error': 'Target role required'}), 400
        
        # Get user's skills
        user_id = get_current_user_id()
        skills = list(mongo.db.skills.find({'user_id': user_id}))
        user_skills = [skill['name'] for skill in skills]
        
        if not user_skills:
            return jsonify({
                'error': 'No skills found. Please add your skills first.',
                'available_roles': SkillGapAnalyzer.get_available_roles()
            }), 400
        
        # Analyze gap
        analysis = SkillGapAnalyzer.analyze_gap(user_skills, target_role)
        
        if 'error' in analysis:
            return jsonify(analysis), 400
        
        return jsonify(analysis), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@career_bp.route('/available-roles', methods=['GET'])
@token_required
def get_available_roles():
    """Get list of roles for skill gap analysis."""
    try:
        roles = SkillGapAnalyzer.get_available_roles()
        return jsonify({'roles': roles}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@career_bp.route('/roadmap', methods=['GET'])
@token_required
def get_career_roadmap():
    """Get personalized career roadmap."""
    try:
        from app import mongo
        user_id = get_current_user_id()
        
        # Get user profile
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        profile = mongo.db.profiles.find_one({'user_id': user_id})
        
        # Get user skills
        skills = list(mongo.db.skills.find({'user_id': user_id}))
        skill_names = [skill['name'].lower() for skill in skills]
        
        # Determine current level based on skills
        if len(skills) < 3:
            current_level = 'Beginner'
            next_skills = ['html', 'css', 'javascript', 'git', 'python']
        elif len(skills) < 8:
            current_level = 'Intermediate'
            next_skills = ['react', 'node.js', 'sql', 'docker', 'api development']
        else:
            current_level = 'Advanced'
            next_skills = ['kubernetes', 'microservices', 'system design', 'aws', 'ci/cd']
        
        # Filter out already learned skills
        recommended_skills = [s for s in next_skills if s not in skill_names]
        
        roadmap = {
            'current_level': current_level,
            'skills_count': len(skills),
            'recommended_next_steps': recommended_skills[:5],
            'milestones': [
                {
                    'phase': 'Short Term (1-2 months)',
                    'goals': recommended_skills[:2] if recommended_skills else ['Build projects', 'Practice coding'],
                    'actions': ['Online courses', 'Build 1-2 projects', 'Daily practice']
                },
                {
                    'phase': 'Medium Term (3-6 months)',
                    'goals': recommended_skills[2:4] if len(recommended_skills) > 2 else ['Advanced concepts', 'Contribute to open source'],
                    'actions': ['Advanced tutorials', 'Contribute to projects', 'Networking']
                },
                {
                    'phase': 'Long Term (6-12 months)',
                    'goals': ['Job ready', 'Portfolio complete', 'Interview preparation'],
                    'actions': ['Build portfolio', 'Apply for jobs', 'Mock interviews']
                }
            ]
        }
        
        return jsonify(roadmap), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
