"""
Skill Gap Analysis - Rule-Based System
NO ML/API - Pure heuristics and curated dictionaries
"""

class SkillGapAnalyzer:
    """Analyze skill gaps for career development."""
    
    # Curated skill requirements by role (Industry realistic)
    ROLE_REQUIREMENTS = {
        'frontend_developer': {
            'required': ['html', 'css', 'javascript', 'react', 'git'],
            'preferred': ['typescript', 'tailwind', 'redux', 'webpack', 'testing'],
            'nice_to_have': ['next.js', 'vue', 'angular', 'sass', 'ci/cd']
        },
        'backend_developer': {
            'required': ['python', 'sql', 'rest api', 'git', 'database'],
            'preferred': ['flask', 'django', 'postgresql', 'mongodb', 'docker'],
            'nice_to_have': ['kubernetes', 'aws', 'redis', 'microservices', 'graphql']
        },
        'fullstack_developer': {
            'required': ['javascript', 'python', 'react', 'sql', 'rest api', 'git'],
            'preferred': ['node.js', 'mongodb', 'docker', 'typescript', 'postgresql'],
            'nice_to_have': ['aws', 'kubernetes', 'ci/cd', 'redis', 'graphql']
        },
        'data_scientist': {
            'required': ['python', 'statistics', 'sql', 'pandas', 'machine learning'],
            'preferred': ['numpy', 'scikit-learn', 'jupyter', 'data visualization', 'git'],
            'nice_to_have': ['tensorflow', 'pytorch', 'aws', 'spark', 'deep learning']
        },
        'devops_engineer': {
            'required': ['linux', 'docker', 'kubernetes', 'ci/cd', 'git'],
            'preferred': ['aws', 'terraform', 'jenkins', 'monitoring', 'scripting'],
            'nice_to_have': ['ansible', 'prometheus', 'grafana', 'helm', 'azure']
        },
        'mobile_developer': {
            'required': ['react native', 'javascript', 'mobile development', 'git', 'api'],
            'preferred': ['typescript', 'redux', 'firebase', 'testing', 'app deployment'],
            'nice_to_have': ['flutter', 'swift', 'kotlin', 'graphql', 'push notifications']
        }
    }
    
    @staticmethod
    def analyze_gap(user_skills, target_role):
        """
        Analyze skill gap for target role.
        user_skills: List of skill names (strings)
        target_role: Role key from ROLE_REQUIREMENTS
        """
        if target_role not in SkillGapAnalyzer.ROLE_REQUIREMENTS:
            return {
                'error': 'Invalid role',
                'available_roles': list(SkillGapAnalyzer.ROLE_REQUIREMENTS.keys())
            }
        
        role_skills = SkillGapAnalyzer.ROLE_REQUIREMENTS[target_role]
        user_skills_lower = [skill.lower().strip() for skill in user_skills]
        
        # Calculate matches
        required_match = [s for s in role_skills['required'] if s in user_skills_lower]
        required_missing = [s for s in role_skills['required'] if s not in user_skills_lower]
        
        preferred_match = [s for s in role_skills['preferred'] if s in user_skills_lower]
        preferred_missing = [s for s in role_skills['preferred'] if s not in user_skills_lower]
        
        nice_match = [s for s in role_skills['nice_to_have'] if s in user_skills_lower]
        nice_missing = [s for s in role_skills['nice_to_have'] if s not in user_skills_lower]
        
        # Calculate readiness score
        required_score = (len(required_match) / len(role_skills['required'])) * 60
        preferred_score = (len(preferred_match) / len(role_skills['preferred'])) * 30
        nice_score = (len(nice_match) / len(role_skills['nice_to_have'])) * 10
        
        readiness = int(required_score + preferred_score + nice_score)
        
        # Determine level
        if readiness >= 80:
            level = 'Ready'
            recommendation = 'You are well-prepared for this role. Start applying!'
        elif readiness >= 60:
            level = 'Almost Ready'
            recommendation = 'Focus on missing required and preferred skills.'
        elif readiness >= 40:
            level = 'Intermediate'
            recommendation = 'Build foundation with required skills first.'
        else:
            level = 'Beginner'
            recommendation = 'Start with fundamental required skills.'
        
        return {
            'target_role': target_role.replace('_', ' ').title(),
            'readiness_score': readiness,
            'level': level,
            'recommendation': recommendation,
            'skills': {
                'required': {
                    'matched': required_match,
                    'missing': required_missing
                },
                'preferred': {
                    'matched': preferred_match,
                    'missing': preferred_missing[:5]  # Top 5
                },
                'nice_to_have': {
                    'matched': nice_match,
                    'missing': nice_missing[:3]  # Top 3
                }
            },
            'next_steps': SkillGapAnalyzer._generate_roadmap(required_missing, preferred_missing)
        }
    
    @staticmethod
    def _generate_roadmap(required_missing, preferred_missing):
        """Generate learning roadmap based on gaps."""
        roadmap = []
        
        if required_missing:
            roadmap.append({
                'priority': 'High',
                'phase': 'Foundation',
                'skills': required_missing[:3],
                'duration': '2-3 months'
            })
        
        if len(required_missing) > 3:
            roadmap.append({
                'priority': 'High',
                'phase': 'Core Skills',
                'skills': required_missing[3:],
                'duration': '1-2 months'
            })
        
        if preferred_missing:
            roadmap.append({
                'priority': 'Medium',
                'phase': 'Advanced',
                'skills': preferred_missing[:4],
                'duration': '2-3 months'
            })
        
        return roadmap if roadmap else [{
            'priority': 'Low',
            'phase': 'Enhancement',
            'skills': ['Keep current skills updated', 'Build projects'],
            'duration': 'Ongoing'
        }]
    
    @staticmethod
    def get_available_roles():
        """Get list of available roles for analysis."""
        return [
            {'key': key, 'title': key.replace('_', ' ').title()}
            for key in SkillGapAnalyzer.ROLE_REQUIREMENTS.keys()
        ]
