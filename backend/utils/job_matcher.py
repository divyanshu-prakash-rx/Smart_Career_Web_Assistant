"""
Job Matching using Classical NLP (TF-IDF + Cosine Similarity)
NO API CALLS - Pure sklearn implementation
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

class JobMatcher:
    """Match resumes with job descriptions using TF-IDF."""
    
    @staticmethod
    def calculate_match_score(resume_text, job_description):
        """
        Calculate similarity between resume and job description.
        Returns match score (0-100) and matching keywords.
        """
        if not resume_text or not job_description:
            return {'score': 0, 'matching_keywords': [], 'missing_keywords': []}
        
        # Preprocess texts
        resume_clean = JobMatcher._preprocess_text(resume_text)
        job_clean = JobMatcher._preprocess_text(job_description)
        
        # TF-IDF Vectorization
        vectorizer = TfidfVectorizer(
            lowercase=True,
            stop_words='english',
            ngram_range=(1, 2),  # Unigrams and bigrams
            max_features=100
        )
        
        try:
            tfidf_matrix = vectorizer.fit_transform([resume_clean, job_clean])
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            match_score = int(similarity * 100)
            
            # Extract matching and missing keywords
            job_keywords = set(JobMatcher._extract_keywords(job_description))
            resume_keywords = set(JobMatcher._extract_keywords(resume_text))
            
            matching = list(job_keywords & resume_keywords)[:10]
            missing = list(job_keywords - resume_keywords)[:8]
            
            return {
                'score': match_score,
                'matching_keywords': matching,
                'missing_keywords': missing
            }
        except Exception:
            return {'score': 0, 'matching_keywords': [], 'missing_keywords': []}
    
    @staticmethod
    def _preprocess_text(text):
        """Clean and normalize text."""
        text = text.lower()
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()
    
    @staticmethod
    def _extract_keywords(text):
        """Extract important keywords (skills, tools, technologies)."""
        keywords = []
        tech_terms = {
            'python', 'java', 'javascript', 'typescript', 'react', 'angular', 'vue',
            'node.js', 'express', 'flask', 'django', 'fastapi', 'spring', 'sql',
            'mongodb', 'postgresql', 'mysql', 'redis', 'aws', 'azure', 'gcp',
            'docker', 'kubernetes', 'ci/cd', 'jenkins', 'git', 'github', 'api',
            'rest', 'graphql', 'microservices', 'agile', 'scrum', 'testing',
            'html', 'css', 'tailwind', 'bootstrap', 'machine learning', 'ai',
            'data analysis', 'pandas', 'numpy', 'tensorflow', 'pytorch'
        }
        
        text_lower = text.lower()
        for term in tech_terms:
            if term in text_lower:
                keywords.append(term)
        
        return keywords
    
    @staticmethod
    def recommend_jobs(resume_text, job_listings):
        """
        Recommend jobs based on resume match scores.
        job_listings: List of dicts with 'id', 'title', 'description'
        Returns sorted list by match score.
        """
        recommendations = []
        
        for job in job_listings:
            result = JobMatcher.calculate_match_score(
                resume_text,
                job.get('description', '')
            )
            
            recommendations.append({
                'job_id': job.get('id'),
                'job_title': job.get('title'),
                'company': job.get('company', 'N/A'),
                'match_score': result['score'],
                'matching_keywords': result['matching_keywords'][:5],
                'missing_keywords': result['missing_keywords'][:3]
            })
        
        # Sort by match score descending
        recommendations.sort(key=lambda x: x['match_score'], reverse=True)
        return recommendations
