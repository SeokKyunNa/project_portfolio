from flask_jwt_extended import get_jwt, get_jwt_identity, create_access_token, set_access_cookies
from datetime import datetime, timezone, timedelta

# refresh token
# 토큰 만료 시간이 30분이 남지 않았다면 재발급
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response