import re
from email_validator import validate_email, EmailNotValidError

def validate_email_address(email):
    """Validate email format."""
    try:
        validate_email(email)
        return True, None
    except EmailNotValidError as e:
        return False, str(e)

def validate_password(password):
    """Validate password strength."""
    if len(password) < 6:
        return False, "Password must be at least 6 characters long"
    return True, None

def validate_required_fields(data, required_fields):
    """Validate that all required fields are present."""
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    return True, None

def allowed_file(filename, allowed_extensions):
    """Check if file extension is allowed."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions
