from db_connect import db
from werkzeug.security import generate_password_hash, check_password_hash

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


class Profiles(db.Model):

    __tablename__ = 'profiles'

    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.String(20), db.ForeignKey('users.id'), nullable=False)
    image           = db.Column(db.String(255))
    introduction    = db.Column(db.String(255))
    edu_name        = db.Column(db.String(255))
    major           = db.Column(db.String(100))
    edu_status      = db.Column(db.String(2))


class Awards(db.Model):

    __tablename__ = 'awards'

    id          = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id     = db.Column(db.String(20), db.ForeignKey('users.id'), nullable=False)
    award       = db.Column(db.String(255))
    details     = db.Column(db.Text())


class Projects(db.Model):

    __tablename__ = 'projects'

    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.String(20), db.ForeignKey('users.id'), nullable=False)
    title           = db.Column(db.String(255), nullable=False)
    content         = db.Column(db.Text(), nullable=False)
    start_date      = db.Column(db.Date, nullable=False)
    end_date        = db.Column(db.Date, nullable=False)


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