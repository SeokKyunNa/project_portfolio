# import os
from datetime import timedelta

# BASE_DIR = os.path.dirname(__file__) # 폴더 구조가 달라져도, 현재 폴더를 가져와서 사용할 수 있도록 설정합니다.
# SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR, 'elice_portfolio.db'))
# os.path.join(BASE_DIR, 'rabbit.db') 를 사용하면, ~~~/rabbit.db 와 같은 디렉토리 구조 문자열이 반환됩니다.

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@127.0.0.1:3306/elice_portfolio'

SQLALCHEMY_TRACK_MODIFICATIONS = 1
# 이걸 켜면 메모리 사용량이 늘어나서, 꺼주는게 좋아요.

SECRET_KEY = "dev"

SESSION_TYPE = "filesystem"

# JWT 설정
# If true this will only allow the cookies that contain your JWTs to be sent
# over https. In production, this should always be set to True
# JWT_COOKIE_SECURE = False
# # JWT_TOKEN_LOCATION = ["cookies"]  # Default: "headers"
# JWT_TOKEN_LOCATION = ["headers"]    # Default: "headers"
# # JWT_ACCESS_COOKIE_PATH = "/"  # Default: "/"
# JWT_REFRESH_COOKIE_PATH = "/"   # Default: "/"
JWT_SECRET_KEY = "dev"  # Default: None
# # JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
# # JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=10)
# JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=60)    # Default: datetime.timedelta(minutes=15)
# JWT_REFRESH_TOKEN_EXPIRES = timedelta(minutes=180)  # Default: datetime.timedelta(days=30)
