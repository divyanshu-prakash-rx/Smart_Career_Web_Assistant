from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo
from config import Config

# Initialize extensions
mongo = PyMongo()
jwt = JWTManager()

def create_app():
    """Application factory pattern."""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    mongo.init_app(app)
    jwt.init_app(app)
    CORS(app, origins=[Config.FRONTEND_URL], supports_credentials=True)
    
    # Initialize configuration
    Config.init_app(app)
    
    # Register blueprints
    from routes.auth_routes import auth_bp
    from routes.dashboard_routes import dashboard_bp
    from routes.resume_routes import resume_bp
    from routes.job_routes import job_bp
    from routes.skill_routes import skill_bp
    from routes.profile_routes import profile_bp
    from routes.career_routes import career_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    app.register_blueprint(resume_bp, url_prefix='/api/resume')
    app.register_blueprint(job_bp, url_prefix='/api/jobs')
    app.register_blueprint(skill_bp, url_prefix='/api/skills')
    app.register_blueprint(profile_bp, url_prefix='/api/profile')
    app.register_blueprint(career_bp, url_prefix='/api/career')
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'Smart Career Assistant API is running'}), 200
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=Config.PORT, debug=Config.DEBUG)
