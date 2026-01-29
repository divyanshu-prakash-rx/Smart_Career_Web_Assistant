import PyPDF2
import re
from collections import Counter

class ResumeAnalyzer:
    """Analyze resume and provide feedback."""
    
    # Common technical skills
    TECHNICAL_SKILLS = {
        'react', 'angular', 'vue', 'javascript', 'typescript', 'python', 'java', 
        'node.js', 'express', 'flask', 'django', 'mongodb', 'sql', 'postgresql',
        'mysql', 'aws', 'azure', 'docker', 'kubernetes', 'git', 'ci/cd', 'html',
        'css', 'tailwind', 'bootstrap', 'rest', 'api', 'graphql', 'agile', 'scrum'
    }
    
    # Action verbs for strong resume
    ACTION_VERBS = {
        'achieved', 'improved', 'developed', 'designed', 'implemented', 'created',
        'managed', 'led', 'increased', 'reduced', 'optimized', 'built', 'launched',
        'delivered', 'solved', 'analyzed', 'collaborated', 'coordinated'
    }
    
    @staticmethod
    def extract_text_from_pdf(file_path):
        """Extract text from PDF file."""
        try:
            text = ""
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text()
            return text
        except Exception as e:
            return None
    
    @staticmethod
    def analyze_resume(file_path):
        """Analyze resume and return detailed feedback."""
        text = ResumeAnalyzer.extract_text_from_pdf(file_path)
        
        if not text:
            return {
                'score': 0,
                'atsScore': 0,
                'strengths': ['Unable to extract text from resume'],
                'improvements': ['Please ensure your resume is a valid PDF with extractable text'],
                'skills': {'detected': [], 'missing': []},
                'error': True
            }
        
        text_lower = text.lower()
        words = re.findall(r'\b\w+\b', text_lower)
        
        # Detect skills
        detected_skills = []
        for skill in ResumeAnalyzer.TECHNICAL_SKILLS:
            if skill in text_lower:
                detected_skills.append(skill.title())
        
        # Calculate scores
        score = ResumeAnalyzer._calculate_score(text, text_lower, words, detected_skills)
        ats_score = ResumeAnalyzer._calculate_ats_score(text, detected_skills)
        
        # Generate strengths and improvements
        strengths = ResumeAnalyzer._identify_strengths(text, text_lower, detected_skills)
        improvements = ResumeAnalyzer._suggest_improvements(text, text_lower, detected_skills)
        
        # Suggest missing skills
        missing_skills = []
        common_required = ['typescript', 'docker', 'kubernetes', 'ci/cd', 'aws']
        for skill in common_required:
            if skill not in text_lower:
                missing_skills.append(skill.title())
        
        return {
            'score': score,
            'atsScore': ats_score,
            'strengths': strengths,
            'improvements': improvements,
            'skills': {
                'detected': detected_skills[:8],  # Top 8 skills
                'missing': missing_skills[:4]  # Top 4 missing
            },
            'error': False
        }
    
    @staticmethod
    def _calculate_score(text, text_lower, words, detected_skills):
        """Calculate overall resume score."""
        score = 50  # Base score
        
        # Skill diversity (+20 points max)
        score += min(len(detected_skills) * 2, 20)
        
        # Has quantifiable achievements (+10 points)
        if re.search(r'\d+%|\$\d+|increased|reduced|improved', text_lower):
            score += 10
        
        # Has action verbs (+10 points)
        action_verb_count = sum(1 for verb in ResumeAnalyzer.ACTION_VERBS if verb in text_lower)
        score += min(action_verb_count * 2, 10)
        
        # Length appropriate (+5 points)
        if 300 < len(words) < 800:
            score += 5
        
        # Has clear sections (+5 points)
        if all(section in text_lower for section in ['experience', 'education']):
            score += 5
        
        return min(score, 100)
    
    @staticmethod
    def _calculate_ats_score(text, detected_skills):
        """Calculate ATS compatibility score."""
        score = 70  # Base score
        
        # Has keywords (+15 points)
        score += min(len(detected_skills) * 2, 15)
        
        # Simple formatting (assumed if text extracted well) (+10 points)
        score += 10
        
        # Standard section names (+5 points)
        if 'experience' in text.lower() and 'education' in text.lower():
            score += 5
        
        return min(score, 100)
    
    @staticmethod
    def _identify_strengths(text, text_lower, detected_skills):
        """Identify resume strengths."""
        strengths = []
        
        if len(detected_skills) >= 5:
            strengths.append('Strong technical skills section with relevant technologies')
        
        if re.search(r'\d+%|\d+\+', text):
            strengths.append('Well-structured work experience with measurable achievements')
        
        action_verbs_found = [v for v in ResumeAnalyzer.ACTION_VERBS if v in text_lower]
        if len(action_verbs_found) >= 5:
            strengths.append('Good use of action verbs and quantified results')
        
        if 'project' in text_lower or 'github' in text_lower:
            strengths.append('Includes relevant projects demonstrating practical experience')
        
        if not strengths:
            strengths.append('Resume submitted successfully for analysis')
        
        return strengths
    
    @staticmethod
    def _suggest_improvements(text, text_lower, detected_skills):
        """Suggest improvements for resume."""
        improvements = []
        
        if len(detected_skills) < 5:
            improvements.append('Add more specific technical skills and tools you\'re proficient in')
        
        if not re.search(r'\d+%|\d+ |increased|reduced', text_lower):
            improvements.append('Include quantifiable achievements and metrics to demonstrate impact')
        
        if 'certification' not in text_lower and 'certified' not in text_lower:
            improvements.append('Consider adding relevant certifications or courses')
        
        if not re.search(r'github|portfolio|project', text_lower):
            improvements.append('Include links to your portfolio, GitHub, or key projects')
        
        if not improvements:
            improvements.append('Continue keeping your resume updated with recent experiences')
        
        return improvements[:4]  # Return top 4 improvements
