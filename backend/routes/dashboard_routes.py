from flask import Blueprint, jsonify
from middleware.auth_middleware import token_required, get_current_user_id
from app import mongo
from datetime import datetime, timedelta

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/stats', methods=['GET'])
@token_required
def get_dashboard_stats():
    """Get dashboard statistics for current user."""
    try:
        user_id = get_current_user_id()
        
        # Get job applications stats
        total_applications = mongo.db.job_applications.count_documents({'user_id': user_id})
        active_applications = mongo.db.job_applications.count_documents({
            'user_id': user_id,
            'status': {'$in': ['applied', 'in-review']}
        })
        interviews_scheduled = mongo.db.job_applications.count_documents({
            'user_id': user_id,
            'status': 'interview'
        })
        
        # Get skills count
        skills_identified = mongo.db.skills.count_documents({'user_id': user_id})
        
        # Get application trend data (last 6 months)
        trend_data = []
        for i in range(5, -1, -1):
            month_start = datetime.utcnow() - timedelta(days=30*i)
            month_name = month_start.strftime('%b')
            
            applications = mongo.db.job_applications.count_documents({
                'user_id': user_id,
                'applied_date': {'$gte': month_start}
            })
            
            interviews = mongo.db.job_applications.count_documents({
                'user_id': user_id,
                'status': 'interview',
                'applied_date': {'$gte': month_start}
            })
            
            offers = mongo.db.job_applications.count_documents({
                'user_id': user_id,
                'status': 'offer',
                'applied_date': {'$gte': month_start}
            })
            
            trend_data.append({
                'month': month_name,
                'applications': applications,
                'interviews': interviews,
                'offers': offers
            })
        
        # Get status breakdown
        status_breakdown = []
        for status in ['applied', 'in-review', 'interview', 'offer', 'rejected']:
            count = mongo.db.job_applications.count_documents({
                'user_id': user_id,
                'status': status
            })
            status_breakdown.append({
                'name': status.replace('-', ' ').title(),
                'value': count
            })
        
        # Get recent activity
        recent_jobs = list(mongo.db.job_applications.find(
            {'user_id': user_id}
        ).sort('created_at', -1).limit(5))
        
        recent_activity = []
        for job in recent_jobs:
            recent_activity.append({
                'action': f"Applied to {job['company']} - {job['position']}",
                'time': job['applied_date'].isoformat() if job.get('applied_date') else datetime.utcnow().isoformat(),
                'status': job['status']
            })
        
        return jsonify({
            'stats': {
                'totalApplications': total_applications,
                'activeApplications': active_applications,
                'interviewsScheduled': interviews_scheduled,
                'skillsIdentified': skills_identified
            },
            'trendData': trend_data,
            'statusBreakdown': status_breakdown,
            'recentActivity': recent_activity
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch dashboard stats', 'message': str(e)}), 500
