from db_connect import db
from werkzeug.security import generate_password_hash, check_password_hash

# 사용자 정보
class Users(db.Model):
    
    __tablename__ = 'users'

    id          = db.Column(db.String(20), primary_key=True, nullable=False)
    password    = db.Column(db.String(255), nullable=False)
    name        = db.Column(db.String(20), nullable=False)

    def __init__(self, id, password, name):
        self.id         = id
        self.password   = password
        self.name       = name

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


# 사용자 프로필
class Profiles(db.Model):

    __tablename__ = 'profiles'

    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.String(20), db.ForeignKey('users.id'), nullable=False)
    image           = db.Column(db.String(255))
    introduction    = db.Column(db.String(255))


# 학력 상태값 관리 테이블
class Edu_status(db.Model):

    __tablename__ = 'edu_status'

    code        = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    status      = db.Column(db.String(20))


# 사용자 학력 사항
class Educations(db.Model):

    __tablename__ = 'educations'

    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.String(20), db.ForeignKey('users.id'), nullable=False)
    name            = db.Column(db.String(100))
    major           = db.Column(db.String(100))
    edu_status      = db.Column(db.Integer)


# 사용자 수상 내역
class Awards(db.Model):

    __tablename__ = 'awards'

    id          = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id     = db.Column(db.String(20), db.ForeignKey('users.id'), nullable=False)
    award       = db.Column(db.String(255))
    details     = db.Column(db.Text())


# 사용자 프로젝트 정보
class Projects(db.Model):

    __tablename__ = 'projects'

    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.String(20), db.ForeignKey('users.id'), nullable=False)
    title           = db.Column(db.String(255), nullable=False)
    content         = db.Column(db.Text(), nullable=False)
    start_date      = db.Column(db.Date, nullable=False)
    end_date        = db.Column(db.Date, nullable=False)


# 사용자 자격증 정보
class Certificates(db.Model):

    __tablename__ = 'certificates'

    id                  = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id             = db.Column(db.String(20), db.ForeignKey('users.id'), nullable=False)
    name                = db.Column(db.String(255), nullable=False)
    issued_by           = db.Column(db.String(255), nullable=False)
    acquisition_date    = db.Column(db.Date, nullable=False)

# db.create_all()

'''
- 회원 정보
    - id
    - password
    - 이름
- 프로필
    - 회원 id
    - 프로필 사진
    - 한 줄 소개
- 학력 사항
    - 학교 이름
    - 전공
    - 재학 상태
- 수상 경력
    - 회원 id
    - 수상 내역
    - 상세 내역
- 포트폴리오
    - 회원 id
    - 제목
    - 내용
    - 시작일
    - 종료일
- 자격증
    - 회원 id
    - 자격증 이름
    - 발급처
    - 취득 일자
'''